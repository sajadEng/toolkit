function Result({wallpaper, dispatch}) {
    
    function handleDonwload() {
        const link = document.createElement('a');
        link.href = wallpaper.src;
        link.download = getFileName(wallpaper.src);
        link.click();

        
        function getFileName(src) {
            for (let i = src.length - 1; i >= 0; i--) {
                if (src.charAt(i) === '/') return src.slice(i + 1)
            } 
            return src
        }
    }


    return (
        <div className="search-result">
            <img src={wallpaper.src} className="search-result--image" loading="lazy" />
            <div className="search-result--keys">
                <div className="search-result--keys__left-side">
                    <p onClick={event => dispatch({type: 'like', payload: {id: wallpaper.id}})} className={wallpaper.liked ? 'liked' : ''} >
                        {wallpaper.liked ? '❤️' :'💔'}
                    </p>
                    <img src="/src/images/wallpainter/download.svg" onClick={handleDonwload} />
                </div>
                <span className="search-result--keys__artist">
                    {wallpaper.artist}
                </span>
            </div>
        </div>
    )
}

export default Result
