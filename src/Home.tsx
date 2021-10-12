import React, { useEffect, useState } from 'react'
import { Flag, Grid, Header, Icon, Segment } from 'semantic-ui-react'
import { mostPopularVideos } from './config/Service'
import PopularCards from './inc/PopularCards'
import StorageCards from './inc/StorageCards'
import { ICurrent } from './models/ICurrent'
import { IMostPopular } from './models/IMostPopular'

export default function App() {

  const [popular, setPopular] = useState<IMostPopular>()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [likedVideos, setlikedVideos] = useState<ICurrent[]>(JSON.parse(localStorage.getItem("likedVideos") || '[]'))
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [videoHistory, setvideoHistory] = useState<ICurrent[]>(JSON.parse(localStorage.getItem("videoHistory") || '[]'))


  useEffect(() => {

    mostPopularVideos().then(res => {
      setPopular(res.data);
      console.log('likedVideos :>> ', likedVideos);
    })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <React.Fragment>

      {likedVideos.length !== 0 &&
        <Segment.Group>
          <Segment>
            <Header textAlign="center"> <Icon name="heart" size="large" color="red"></Icon> Liked Videos </Header>
          </Segment>
          <Segment>
            <Grid stackable doubling columns={3}>

              {likedVideos
                .map((item, index) => {
                  if (index < likedVideos.length - 6) {
                    return null;
                  }
                  return (
                    <StorageCards key={index} item={item} />
                  )
                })
              }

            </Grid>
          </Segment>
        </Segment.Group>
      }


      {videoHistory.length !== 0 &&
        <Segment.Group>
          <Segment>
            <Header textAlign="center"> <Icon name="history" size="large" color="black"></Icon> Video History </Header>
          </Segment>
          <Segment>
            <Grid stackable doubling columns={3}>

              {videoHistory
                .map((item, index) => {
                  if (index < videoHistory.length - 6) {
                    return null;
                  }
                  return (
                    <StorageCards key={index} item={item} />
                  )
                })
              }

            </Grid>
          </Segment>
        </Segment.Group>
      }


      <Segment.Group>
        <Segment>
          <Header textAlign="center"> <Flag name='tr' size="medium" /> Most popular videos for Turkey </Header>
        </Segment>
        <Segment>
          <Grid stackable doubling columns={3}>
            {
              popular?.items.map(item => {
                return (
                  <PopularCards key={item.id} item={item} />
                )
              })
            }
          </Grid>
        </Segment>
      </Segment.Group>

    </React.Fragment>
  )
}


