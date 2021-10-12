import React from 'react'
import { Card, CardContent, GridColumn, Header, Image } from 'semantic-ui-react'
import { ICurrent } from '../models/ICurrent'
import { Item } from '../models/IMostPopular'

export default function MyCards(props: { item: Item }) {

    function setTitleLength(title: string) {
        if (title.length >25) {
            const newTitle = title.slice(0, 25) + "..."
            return newTitle
        }
        else {
            return title
        }
    }


    function setSession(item: Item) {
        const obj: ICurrent = {
            id: item.id,
            title: item.snippet.title,
            date: item.snippet.publishedAt,
            channelTitle: item.snippet.channelTitle,
            description: item.snippet.description,
            photo: item.snippet.thumbnails.medium.url,
        }

        sessionStorage.setItem("current", JSON.stringify(obj))
    }

    return (
        <React.Fragment>
            <GridColumn key={props.item.id}>
                <Card href='/detail' className="ui centered" onClick={e => setSession(props.item)}>
                    <Image src={props.item.snippet.thumbnails.medium.url} wrapped ui={false} />
                    <CardContent extra textAlign="center">
                        <Header size="small">
                            {setTitleLength(props.item.snippet.localized.title)}
                        </Header>
                        <Card.Meta>
                            <span className='date'>{props.item.snippet.publishedAt}</span>
                        </Card.Meta>
                    </CardContent>
                </Card>
            </GridColumn>
        </React.Fragment>
    )
}
