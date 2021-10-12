import React, { useEffect, useState } from 'react'
import { Button, CardMeta, Embed, Grid, GridColumn, GridRow, Header, Segment } from 'semantic-ui-react'
import { ICurrent } from './models/ICurrent'

export default function Detail() {

    const [current, setCurrent] = useState<ICurrent>(JSON.parse(sessionStorage.getItem("current") || '[]'))
    const [likeColor, setLikeColor] = useState<any>("grey")

    function likeStatus() {
        if (likeColor === "grey") {
            setLikeColor("red")

            if (localStorage.getItem("likedVideos") == null) {
                const likedArr = [current]
                localStorage.setItem("likedVideos", JSON.stringify(likedArr))
            }
            else {
                const likedArr = JSON.parse(localStorage.getItem("likedVideos") || '[]')
                likedArr.push(current)
                localStorage.setItem("likedVideos", JSON.stringify(likedArr))
            }
        }
        else {
            setLikeColor("grey")

            const likedArr = JSON.parse(localStorage.getItem("likedVideos") || '[]')
            for (const index in likedArr) {
                if (likedArr[index].id === current.id) {

                    likedArr.splice(index, 1)
                    if (likedArr.length === 0) {
                        localStorage.removeItem("likedVideos")
                    }
                    else {
                        localStorage.setItem("likedVideos", JSON.stringify(likedArr))
                    }

                    break;
                }
            }

        }
    }

    useEffect(() => {
        setCurrent(JSON.parse(sessionStorage.getItem("current") || '[]'))
        setLikeColor("grey")
        const lastCurrent = JSON.parse(sessionStorage.getItem("current") || '[]')

        if (localStorage.getItem("likedVideos")) {
            const likedArr = JSON.parse(localStorage.getItem("likedVideos") || '[]')
            for (const item of likedArr) {
                if (item.id === lastCurrent.id) {
                    setLikeColor("red");
                }
            }
        }

        if (localStorage.getItem("videoHistory") === null) {
            const historyArr = [lastCurrent]
            localStorage.setItem("videoHistory", JSON.stringify(historyArr))
        }
        else {
            const historyArr = JSON.parse(localStorage.getItem("videoHistory") || '[]')
            for (let i = 0; i < historyArr.length; i++) {
                if (historyArr[i].id === lastCurrent.id) {
                    historyArr.splice(i, 1)
                }
            }
            historyArr.push(lastCurrent)
            localStorage.setItem("videoHistory", JSON.stringify(historyArr))
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [sessionStorage.getItem("current")])

    return (
        <React.Fragment>
            <Segment>
                <Embed
                    id={String(current.id)}
                    defaultActive
                    source='youtube'
                    aspectRatio="21:9"
                />
                <br />
                <Grid stackable divided='vertically'>
                    <Grid.Row columns={3}>
                        <Grid.Column textAlign="left">
                            <Header size="medium"> {current.channelTitle} </Header>
                        </Grid.Column>
                        <Grid.Column textAlign="center">
                            <Header size="medium"> {current.title} </Header>
                            <CardMeta>{current.date}</CardMeta>
                        </Grid.Column>
                        <Grid.Column textAlign="right" >
                            <Button
                                onClick={e => likeStatus()}
                                color={likeColor}
                                icon='heart'
                                label={{ basic: true, color: { likeColor }, pointing: 'left', content: 'Like' }}
                            />
                        </Grid.Column>
                    </Grid.Row>
                    <GridRow columns={16} >
                        <GridColumn width={16} textAlign="center">
                            <Header size="small">{current.description} </Header>
                        </GridColumn>
                    </GridRow>
                </Grid>
            </Segment>

            <br />
        </React.Fragment>
    )
}
