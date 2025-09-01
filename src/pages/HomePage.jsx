import heroImg from '../assets/img/HERO_IMG.png'

export function HomePage() {
    return (
        <section className='home-page'>
            <h1>Welcome to our store</h1>
            <img
                src={heroImg}
                alt='Hero Image'
            />
        </section>
    )
}