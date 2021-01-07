import React, { useEffect, useState } from "react"
import { Grid, Image } from "semantic-ui-react"
import { useLocation } from "react-router-dom"
import ResultCard from "./ResultCard"
import Loader from "./Loader"
import Header from "./Header"
import "./Results.css"

export default function Results({ config }) {
  const [isLoading, setIsLoading] = useState(true)
  const [loaderText, setLoaderText] = useState("Loading ...")
  const [results, setResults] = useState([])
  let location = useLocation()
  let term = decodeURI(location.state.searchTerm)

  useEffect(() => {
    async function fetchDataAssets() {
      console.log(process.env.REACT_APP_DAPP_ID)
      try {
        let count = 1
        while (count <= config.length) {
          setLoaderText(`Searching ${count} / ${config.length} markets`)
          const baseUrl = config[count - 1].metadataCacheUrl
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
            console.log("Config - ", config[count - 1])
            let processedData = await processData(results, config[count - 1])

            setResults([...results, ...processedData.slice()])
          }
          count++
        }
        console.log(results)
      } catch (error) {
        console.log(error.message)
      }
    }
    fetchDataAssets()
  }, [config])

  async function processData(datasets, config) {
    return await Promise.all(
      datasets.map(item => {
        var metadata = item.service[0]
        if (metadata) {
          if (metadata.attributes) {
            var tags = [],
              description = ""
            var { name, author } = metadata.attributes.main
            let extra = metadata.attributes.additionalInformation
            if (extra) {
              tags = extra.tags ? extra.tags.splice(0, 2) : []
              description = extra.description
            }

            return {
              name,
              author,
              description,
              tags,
              price: Number(item.price.value).toFixed(2),
              ddo: item,
              did: item.id,
              config
            }
          }
        }
      })
    )
  }

  function renderRow(it, index) {
    return (
      <Grid.Row centered key={index} columns={1}>
        <Grid.Column>
          <ResultCard
            did={it.did}
            title={it.name}
            author={it.author}
            tags={it.tags}
            ddo={it.ddo}
            price={it.price}
            description={it.description}
            config={it.config}
          />
        </Grid.Column>
      </Grid.Row>
    )
  }
  return (
    <>
      <Header term={term} />
      {isLoading ? (
        <Loader text={loaderText} />
      ) : results.length ? (
        <div className="container">
          <Grid>{results.map((it, i) => renderRow(it, i))}</Grid>
        </div>
      ) : (
        <div className="container">
          <h2>No Results found</h2>
        </div>
      )}
    </>
  )
}
