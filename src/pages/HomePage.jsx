import heroImg from '../assets/img/HERO_IMG.png'

export function HomePage() {
    return (
        <section className='home-page'>
            <img
                src={heroImg}
                alt='Hero Image'
            />
        </section>
    )
}