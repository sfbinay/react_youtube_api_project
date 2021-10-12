import React from 'react'
import { Card, CardContent, GridColumn, Header, Image } from 'semantic-ui-react'
import { ICurrent } from '../models/ICurrent'

export default function StorageCards(props: { item: ICurrent }) {

    function setTitleLength(title: String) {
        if (title.length > 25) {
            const newTitle = title.slice(0, 25) + "..."
            return newTitle
        }
        else {
            return title
        }
    }

    return (
        <React.Fragment>
            <GridColumn>
                <Card href='/detail' className="ui centered" onClick={e => sessionStorage.setItem("current", JSON.stringify(props.item))}>
                    <Image src={props.item.photo} wrapped ui={false} />
                    <CardContent extra textAlign="center">
                        <Header size="small">
                            {setTitleLength(props.item.title)}
                        </Header>
                        <Card.Meta>
                            <span className='date'>{props.item.date}</span>
                        </Card.Meta>
                    </CardContent>
                </Card>
            </GridColumn>
        </React.Fragment>
    )
}
