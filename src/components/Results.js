import React, { useEffect, useState } from "react"
import { Grid, Header, Image } from "semantic-ui-react"
import { useParams } from "react-router-dom"
import ResultCard from "./ResultCard"
import Loader from "react-loader-spinner"
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"
import "./Results.css"

let config = "https://aquarius.mainnet.oceanprotocol.com"

export default function Collection() {
  const [isLoading, setIsLoading] = useState(true)
  const [results, setResults] = useState([])
  const { accountId } = useOcean()
  let { term } = useParams()

  useEffect(() => {
    async function fetchDataAssets() {
      console.log("Search term - ", term)
      console.log(term)
      console.log(process.env.REACT_APP_DAPP_ID)
      try {
        const baseUrl = config
        const url = `${baseUrl}/api/v1/aquarius/assets/ddo/query?text=${term}&offset=100`
        console.log(url)
        let encodedUrl = encodeURI(url)
        const response = await fetch(encodedUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          }
        })
        const { results } = await response.json()
        if (response.status == 200) {
          setIsLoading(false)
          let processedData = await processData(results)
          console.log("processed data -")
          console.log(processedData)
          let finalArr = splitResults(processedData, 4)
          console.log("final data -")
          console.log(finalArr)
          setResults(finalArr.slice())
        }
      } catch (error) {
        console.log(error.message)
      }
    }
    fetchDataAssets()
  }, [config])

  function splitResults(array, n) {
    let [...arr] = array
    var res = []
    while (arr.length) {
      res.push(arr.splice(0, n))
    }
    return res
  }

  function renderLoader() {
    return (
      <div style={{ paddingTop: 200 }}>
        <Loader type="Bars" color="skyblue" height={100} width={100} />
        <h3>Loading Search Results</h3>
      </div>
    )
  }

  async function processData(datasets) {
    return await Promise.all(
      datasets.map(item => {
        var metadata = item.service[0]
        if (metadata) {
          if (metadata.attributes) {
            var tags = []
            var { name, author } = metadata.attributes.main
            let extra = metadata.attributes.additionalInformation
            if (extra) {
              tags = extra.tags ? extra.tags.splice(0, 2) : []
            }

            return {
              name,
              author,
              tags,
              price: Number(item.price.value).toFixed(2),
              ddo: item,
              did: item.id
            }
          }
        }
      })
    )
  }

  function renderRow(item, index) {
    return (
      <Grid.Row centered key={index} columns={4}>
        {item.map(it => {
          return (
            <Grid.Column>
              <ResultCard
                did={it.did}
                title={it.name}
                author={it.author}
                tags={it.tags}
                config={config}
                ddo={it.ddo}
                price={it.price}
              />
            </Grid.Column>
          )
        })}
      </Grid.Row>
    )
  }
  return isLoading ? (
    renderLoader()
  ) : results.length ? (
    <Grid divided="vertically" className="container">
      {results.map((it, i) => renderRow(it, i))}
    </Grid>
  ) : (
    <h2>No Results found</h2>
  )
}
