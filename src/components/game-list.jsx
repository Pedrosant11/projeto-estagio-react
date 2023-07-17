import ActionAreaCard from './game-card';

export default function GameList({games}) {
    return (
            <div className="games-list"> {
                games.map((game) => (
                    <ActionAreaCard key={game.id} id={game.id} title={game.title} image={game.thumbnail} altText={game.title} description={game.short_description} platform={game.platform} releaseDate={game.release_date} publisher={game.publisher} genre={game.genre}/>
                ))
                }   
        </div>
    )
}