  import React, { useEffect, useState } from 'react';
  import slides from './Slides'

  function Carousel(props) {
    return (
      <section className="o-wrapper">{props.children}</section>
    )
  }

  function Slides(props) {
    return (
      <ul className="c-carousel" {...props} />
    )
  }

  function handleSize (itemsToShow) {
    if (itemsToShow.isSmall) {
      return 125
    } else if (itemsToShow.isMedium) {
      return 205
    } else if (itemsToShow.isLarge) {
      return 255
    }
  }

  function Slide(props) {
      const { itemsToShow, image, title, duration, maturityRating, categories } = props

      const styles = {
        backgroundImage: `url(${image})`,
        width: `${handleSize(itemsToShow)}px`,
        flexBasis: `${handleSize(itemsToShow)}px`,
        height: `${(handleSize(itemsToShow) * 2) - 10}px`
      }

      return (
        <li
          style={{...styles}}
          className="c-carousel__slide"
        >
          <p className="slide__inner">
          <span className="title">{title}</span>
          <span className="maturityRating">{maturityRating}</span>
          <span>{duration}</span>
          {categories.map((item, index) => (
            <span key={item+index}>{item}</span>
          ))}
          </p>
        </li>
      )
  }

  class MediaListener extends React.Component {

    state = {
      matches: window.matchMedia(this.props.query).matches
    }

    componentDidMount () {
      this.setup()
    }

    setup () {
      let media = window.matchMedia(this.props.query)

      let listener = () => this.setState({matches: media.matches})

      media.addListener(listener)

      this.removeListener = () => {
        media.removeListener(listener)
      }
    }

    componentDidUpdate (prevProps) {
      if (prevProps.query !== this.props.query) {
        this.removeListener()
        this.setState({
          matches: window.matchMedia(this.props.query).matches
        })
        this.setup()
      }
    }

    componentWillUnmount () {
      this.removeListener()
    }

    render () {
      return this.props.children(this.state.matches)
    }
  }

  function App() {
    return (
      <MediaListener query="(max-width: 600px)">
        {small => (
          <MediaListener query="(min-width: 601px) and (max-width: 1023px)">
            {medium => (
              <MediaListener query="(min-width: 1024px)">
                {large => (
                  <Carousel>
                    <h1 className="o-h1">NETFLIX ORIGINALS</h1>
                      <Slides>
                        {slides.map((item, index) => (
                          <Slide
                            id={`image-${index}`}
                            key={index}
                            index={index}
                            itemsToShow={{isSmall: small, isMedium: medium, isLarge: large}}
                            image={item.img}
                            {...item}
                          />
                        ))}
                      </Slides>
                    </Carousel>
                )}
              </MediaListener>
            )}
          </MediaListener>
        )}
      </MediaListener>
    )
  }

  export default App;
