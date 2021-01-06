import React from "react"
import { Card, Icon, Image, Label } from "semantic-ui-react"
import { Link } from "react-router-dom"
import "./ResultCard.css"

export default function ResultCard({
  title,
  author,
  playtime,
  did,
  tags,
  price
}) {
  return (
    <Link to={"/asset/" + did}>
      <Card fluid className="cards">
        <Card.Content className="cardContent">
          <Card.Header>{title}</Card.Header>
          <Card.Meta>
            <span>{author}</span>
          </Card.Meta>
          <Card.Description>
            {tags.map(tag => (
              <Label as="a" color="blue" tag>
                {tag}
              </Label>
            ))}
          </Card.Description>
        </Card.Content>
      </Card>
    </Link>
  )
}
