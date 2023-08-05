import React, { useEffect, useRef } from 'react'
import Footer from './FooterLeft'
import FooterRight from './FooterRight'
import './Video.css'

export default function Video(props) {
	const { url, channel, description, song, likes, shares, messages } = props
	const videoRef = useRef(null)

	const onVideoPress = () => {
            // write toggle logic here
        if (videoRef.current.paused) {
            videoRef.current.play()
        } else {
            videoRef.current.pause()
        }
	}

    //if i scroll over the video or the video is not on the screen, pause it.
    //IntersectionObserverAPI
    useEffect(() => {
        const options = {
            root: document.querySelector('.App'),
            rootMargin: "0px",
            threshold: [0.25, 0.75]
        };

        const handlePlay = (entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    videoRef.current.play();
                } else {
                    videoRef.current.pause();
                }
            });
        };

        const observer = new IntersectionObserver(handlePlay, options);

        observer.observe(videoRef.current);
  });

	return (
		<div className="video">
			<video
				className="player"
				onClick={onVideoPress}
				muted
				ref={videoRef}
				loop
				src={url}
			></video>
			<div className="bottom-controls">
				<Footer channel={channel} description={description} song={song} />
				<FooterRight likes={likes} shares={shares} messages={messages} />
			</div>
		</div>
	)
}
