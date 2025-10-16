import bgHero from '../../assets/images/hero.png'

export default function Hero() {
  return (
    <div className="h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${bgHero})` }}>
      <h1>Grow your business faster</h1>
    </div>
  )
}
