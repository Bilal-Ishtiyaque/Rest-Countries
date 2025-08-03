import './CountryListShimmer.css'

const CountryListShimmer = () => {

  return (
    <>
        {Array.from({length:10}).map((el, i) => 
        <article className="card shimmerCard" key={i}>
                <figure className='animate'>
                </figure>
                <figcaption className="cardText">
                    <h3 className="cardTitle animate"></h3>
                    <p className='animate'>
                    </p>
                    <p className='animate'>
                    </p>
                    <p className='animate'>
                    </p>
                </figcaption>
        </article>
         )}
    </>
  )
}

export default CountryListShimmer