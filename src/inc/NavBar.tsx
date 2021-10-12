import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom';
import { Button, Grid, GridColumn, Header, Icon, Image, Input, List, Segment, Transition } from 'semantic-ui-react'
import { searchVideo } from '../config/Service';
import { ICurrent } from '../models/ICurrent';
import { ISearch, Item } from '../models/ISearch';

export default function NavBar() {

    const [searchValue, setSearchValue] = useState("")
    const [searchList, setSearchList] = useState<ISearch>()
    const [visible, setVisible] = useState(false)

    function searchResult() {
        if (searchValue === "") { }
        else {
            searchVideo(searchValue).then(res => {
                setVisible(true);
                setSearchList(res.data)
            }).catch(err => {
                console.log('err :>> ', err);
            })
        }
    }

    function closeResults() {
        setVisible(false)
    }
    
    function setSession(item: Item) {
        const obj: ICurrent = {
            id: item.id.videoId,
            title: item.snippet.title,
            date: item.snippet.publishedAt,
            channelTitle: item.snippet.channelTitle,
            description: item.snippet.description,
            photo: item.snippet.thumbnails.medium.url
        }

        sessionStorage.setItem("current", JSON.stringify(obj))
    }

    useEffect(() => {
        closeResults()
    }, [])

    return (
        <React.Fragment>
            <Segment textAlign="center" inverted color="blue">
                <Grid stackable doubling columns={3}>

                    <GridColumn>

                        <Button animated="fade" as={Link} to='/'>
                            <Button.Content visible>Home</Button.Content>
                            <Button.Content hidden> <Icon name='home' /></Button.Content>
                        </Button>

                    </GridColumn>

                    <GridColumn>

                        <Input icon onChange={e => setSearchValue(e.target.value)} placeholder='Search Video...'>
                            <input />
                            <Button onClick={e => searchResult()} animated="fade" >
                                <Button.Content visible>Search</Button.Content>
                                <Button.Content hidden> <Icon name='search' /></Button.Content>
                            </Button>
                        </Input>
                    </GridColumn>

                </Grid>

            </Segment>

            <Transition visible={visible} animation='slide down' duration={500}>
                <Segment.Group>
                    <Segment>
                        <Grid stackable columns="equal">
                            <Grid.Column width={7}>
                                <Button onClick={e => closeResults()} animated="fade" >
                                    <Button.Content visible><Header size="tiny"> Close </Header></Button.Content>
                                    <Button.Content hidden> <Icon name='close' /></Button.Content>
                                </Button>
                            </Grid.Column>
                            <Grid.Column width={9}>
                                <Header size="large"> Search Results </Header>
                            </Grid.Column>
                        </Grid>

                    </Segment>
                    <Segment>
                        <List divided>
                            {
                                searchList?.items.map((item, index) => {
                                    return (
                                        <List.Item key={index} as={NavLink} to="/detail"
                                            onClick={e => { closeResults(); setSession(item) }}>
                                            <Image size='tiny' src={item.snippet.thumbnails.medium.url} />
                                            <List.Content>
                                                <List.Header>{item.snippet.title}</List.Header>
                                                <List.Description>{item.snippet.description}</List.Description>
                                            </List.Content>
                                        </List.Item>
                                    )
                                })
                            }
                        </List>
                    </Segment>
                </Segment.Group>
            </Transition>
        </React.Fragment>
    )
}
