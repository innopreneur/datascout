import React from "react"
import { Card, Icon, Image, Label } from "semantic-ui-react"
import { Link } from "react-router-dom"
import ReactMarkdown from "react-markdown"
import "./ResultCard.css"

export default function ResultCard({
  title,
  author,
  description,
  did,
  tags,
  price,
  config
}) {
  return (
    <a href={config.marketUrl + config.marketUrlAssetRoute + did}>
      <Card fluid className="card" style={{ outline: "none" }}>
        <Card.Content className="cardContent">
          <Card.Header>{title}</Card.Header>
          <Card.Meta>
            <span>{config.marketUrl}</span>
          </Card.Meta>
          <Card.Description>
            {description.substring(0, 200) + "..."}
          </Card.Description>
        </Card.Content>
        <Card.Content>
          <Card.Meta>
            <span>by {author}</span>
          </Card.Meta>
          <Card.Meta>
            <span>Price - {price > 0 ? price + " OCEAN" : "FREE"}</span>
          </Card.Meta>
        </Card.Content>
      </Card>
    </a>
  )
}
