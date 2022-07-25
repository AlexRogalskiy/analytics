defmodule Plausible.Google.ApiTest do
  use Plausible.DataCase, async: true
  alias Plausible.Google.Api
  alias Plausible.HTTPClient
  import Plausible.TestUtils
  import Double

  @ok_response Jason.encode!(%{
                 "reports" => [
                   %{
                     "data" => %{
                       "rows" => [
                         %{
                           "dimensions" => ["20220101"],
                           "metrics" => [%{"values" => ["1", "1", "1", "1", "1"]}]
                         }
                       ]
                     }
                   }
                 ]
               })

  @empty_response Jason.encode!(%{
                    "reports" => [%{"data" => %{"rows" => []}}]
                  })

  describe "fetch_and_persist/4" do
    setup [:create_user, :create_new_site]

    test "will fetch and persist import data from Google Analytics", %{site: site} do
      http_client =
        HTTPClient
        |> stub(:post, fn _url, _headers, _params ->
          {:ok, %Finch.Response{status: 200, body: @ok_response}}
        end)

      request = %{
        dataset: "imported_visitors",
        view_id: "123",
        date_range: Date.range(~D[2022-01-01], ~D[2022-02-01]),
        dimensions: ["ga:date"],
        metrics: ["ga:users"],
        access_token: "fake-token",
        page_token: nil
      }

      Api.fetch_and_persist(site, request, http_client: http_client, sleep_time: 0)

      assert imported_visitor_count(site) == 1
    end

    test "retries HTTP request up to 5 times before raising the last error", %{site: site} do
      httpoison =
        HTTPClient
        |> stub(:post, fn _url, _headers, _body ->
          {:error, %Mint.TransportError{reason: :nxdomain}}
        end)
        |> stub(:post, fn _url, _headers, _body ->
          {:error, %Mint.TransportError{reason: :timeout}}
        end)
        |> stub(:post, fn _url, _headers, _body ->
          {:error, %Mint.TransportError{reason: :closed}}
        end)
        |> stub(:post, fn _url, _headers, _body ->
          {:ok, %Finch.Response{status: 503}}
        end)
        |> stub(:post, fn _url, _headers, _body ->
          {:ok, %Finch.Response{status: 502}}
        end)

      request = %{
        view_id: "123",
        date_range: Date.range(~D[2022-01-01], ~D[2022-02-01]),
        dimensions: ["ga:date"],
        metrics: ["ga:users"],
        access_token: "fake-token",
        page_token: nil
      }

      assert_raise RuntimeError, "Google API request failed too many times", fn ->
        Api.fetch_and_persist(site, request, http_client: httpoison, sleep_time: 0)
      end

      assert_receive({Plausible.HTTPClient, :post, [_, _, _]})
      assert_receive({Plausible.HTTPClient, :post, [_, _, _]})
      assert_receive({Plausible.HTTPClient, :post, [_, _, _]})
      assert_receive({Plausible.HTTPClient, :post, [_, _, _]})
      assert_receive({Plausible.HTTPClient, :post, [_, _, _]})
    end

    test "retries HTTP request if the rows are empty", %{site: site} do
      httpoison =
        HTTPClient
        |> stub(:post, fn _url, _headers, _body ->
          {:ok, %Finch.Response{status: 200, body: @empty_response}}
        end)
        |> stub(:post, fn _url, _headers, _body ->
          {:ok, %Finch.Response{status: 200, body: @ok_response}}
        end)

      request = %{
        dataset: "imported_visitors",
        view_id: "123",
        date_range: Date.range(~D[2022-01-01], ~D[2022-02-01]),
        dimensions: ["ga:date"],
        metrics: ["ga:users"],
        access_token: "fake-token",
        page_token: nil
      }

      Api.fetch_and_persist(site, request, http_client: httpoison, sleep_time: 0)

      assert_receive({Plausible.HTTPClient, :post, [_, _, _]})
      assert_receive({Plausible.HTTPClient, :post, [_, _, _]})

      assert imported_visitor_count(site) == 1
    end
  end

  defp imported_visitor_count(site) do
    Plausible.ClickhouseRepo.one(
      from iv in "imported_visitors",
        where: iv.site_id == ^site.id,
        select: sum(iv.visitors)
    )
  end
end
