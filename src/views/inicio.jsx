import BuscarVuelos from "../components/buscarVuelos";

const Inicio = () => {
    const h3 = "tracking-widest text-indigo-500 text-xs font-medium title-font";
    const divBestCity = "bg-gray-100 p-6 rounded-lg hover:bg-gray-300";
    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto ">
                <div className="flex flex-wrap w-full mb-20">
                    <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
                        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">Explora los Vuelos Más Populares</h1>
                        <div className="h-1 w-20 bg-indigo-500 rounded">
                        </div>
                    </div>
                    <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">Descubre las mejores opciones para tus próximas aventuras. Ofrecemos vuelos a destinos únicos que combinan comodidad, precios accesibles y experiencias inolvidables. Desde explorar el vibrante ritmo de la ciudad hasta relajarte en playas paradisíacas, ¡tú eliges el destino perfecto para tus sueños!</p>
                </div>
                <div className="flex flex-wrap -m-4">
                    <div className="xl:w-1/4 md:w-1/2 p-4">
                        <div className={divBestCity}>
                            <img className="h-40 rounded w-full object-cover object-center mb-6" src="./src/assets/city/chicago_1.jpg" alt="content"/>
                            <h3 className={h3}>CITY</h3>
                            <h2 className="text-lg text-gray-900 font-medium title-font mb-4">Chicago</h2>
                            <p className="leading-relaxed text-base">La Ciudad de los Vientos, famosa por su arquitectura icónica. Un destino perfecto para disfrutar arte y vistas impresionantes.</p>
                        </div>
                    </div>
                    <div className="xl:w-1/4 md:w-1/2 p-4">
                        <div className={divBestCity}>
                            <img className="h-40 rounded w-full object-cover object-center mb-6" src="./src/assets/city/luxembourg_1.jpg" alt="content"/>
                            <h3 className={h3}>CITY</h3>
                            <h2 className="text-lg text-gray-900 font-medium title-font mb-4">Luxembourg</h2>
                            <p className="leading-relaxed text-base">Ciudad fortificada y capital de Luxemburgo, famosa por su historia medieval, instituciones europeas y su papel como centro financiero internacional.</p>
                        </div>
                    </div>
                    <div className="xl:w-1/4 md:w-1/2 p-4">
                        <div className={divBestCity}>
                        <img className="h-40 rounded w-full object-cover object-center mb-6" src="./src/assets/city/tokyo_1.jpg" alt="content"/>
                            <h3 className={h3}>CITY</h3>
                            <h2 className="text-lg text-gray-900 font-medium title-font mb-4">Tokyo</h2>
                            <p className="leading-relaxed text-base">La vibrante capital de Japón, mezcla tradición y modernidad. Perfecta para descubrir templos, tecnología y gastronomía única.</p>
                        </div>
                    </div>
                    <div className="xl:w-1/4 md:w-1/2 p-4">
                        <div className={divBestCity}>
                            <img className="h-40 rounded w-full object-cover object-center mb-6" src="./src/assets/city/medellin_1.jpg" alt="content"/>
                            <h3 className={h3}>CITY</h3>
                            <h2 className="text-lg text-gray-900 font-medium title-font mb-4">Medellin</h2>
                            <p className="leading-relaxed text-base">Conocida como la "Ciudad de la Eterna Primavera", destacada por su clima agradable, innovación y transformación social.</p>
                        </div>
                    </div>
                </div>
            </div>

            <BuscarVuelos/>

            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-col text-center w-full mb-20">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Viaja a Tu Próxima Aventura</h1>
                    <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Explora destinos increíbles alrededor del mundo. Desde ciudades llenas de historia y cultura hasta playas paradisíacas, encuentra el lugar perfecto para tus próximas vacaciones con las mejores opciones de vuelo.</p>
                </div>
                <div className="flex flex-wrap -m-4">
                    <div className="lg:w-1/3 sm:w-1/2 p-4">
                        <div className="flex relative">
                            <img alt="city" className="absolute inset-0 w-full h-full object-cover object-center" src="./src/assets/city/mexico_1.jpg"/>
                            <div className="px-8 py-10 relative z-10 w-full border-4 border-gray-200 bg-white opacity-0 hover:opacity-100">
                                <h2 className="tracking-widest text-sm title-font font-medium text-indigo-500 mb-1">CITY</h2>
                                <h1 className="title-font text-lg font-medium text-gray-900 mb-3">Mexico</h1>
                                <p className="leading-relaxed">Capital de México, conocida por su historia, cultura azteca y colonial, y su vibrante gastronomía.</p>
                            </div>
                        </div>
                    </div>
                    <div className="lg:w-1/3 sm:w-1/2 p-4">
                        <div className="flex relative">
                            <img alt="city" className="absolute inset-0 w-full h-full object-cover object-center" src="./src/assets/city/berlin_1.jpg"/>
                            <div className="px-8 py-10 relative z-10 w-full border-4 border-gray-200 bg-white opacity-0 hover:opacity-100">
                                <h2 className="tracking-widest text-sm title-font font-medium text-indigo-500 mb-1">CITY</h2>
                                <h1 className="title-font text-lg font-medium text-gray-900 mb-3">Berlin</h1>
                                <p className="leading-relaxed"> Capital de Alemania, conocida por su historia (Muro de Berlín), arte y vida nocturna.</p>
                            </div>
                        </div>
                    </div>
                    <div className="lg:w-1/3 sm:w-1/2 p-4">
                        <div className="flex relative">
                            <img alt="city" className="absolute inset-0 w-full h-full object-cover object-center" src="./src/assets/city/dubai_1.jpg"/>
                            <div className="px-8 py-10 relative z-10 w-full border-4 border-gray-200 bg-white opacity-0 hover:opacity-100">
                                <h2 className="tracking-widest text-sm title-font font-medium text-indigo-500 mb-1">CITY</h2>
                                <h1 className="title-font text-lg font-medium text-gray-900 mb-3">Dubai</h1>
                                <p className="leading-relaxed">Ciudad futurista de Emiratos Árabes, famosa por rascacielos como el Burj Khalifa y lujos extremos.</p>
                            </div>
                        </div>
                    </div>
                    <div className="lg:w-1/3 sm:w-1/2 p-4">
                        <div className="flex relative">
                            <img alt="city" className="absolute inset-0 w-full h-full object-cover object-center" src="./src/assets/city/amsterdam_1.jpg"/>
                            <div className="px-8 py-10 relative z-10 w-full border-4 border-gray-200 bg-white opacity-0 hover:opacity-100">
                                <h2 className="tracking-widest text-sm title-font font-medium text-indigo-500 mb-1">CITY</h2>
                                <h1 className="title-font text-lg font-medium text-gray-900 mb-3">Amsterdam</h1>
                                <p className="leading-relaxed">Ciudad de los Países Bajos, famosa por sus canales, bicicletas y arte (Van Gogh, Rijksmuseum).</p>
                            </div>
                        </div>
                    </div>
                    <div className="lg:w-1/3 sm:w-1/2 p-4">
                        <div className="flex relative">
                            <img alt="city" className="absolute inset-0 w-full h-full object-cover object-center" src="./src/assets/city/moscow_1.jpg"/>
                            <div className="px-8 py-10 relative z-10 w-full border-4 border-gray-200 bg-white opacity-0 hover:opacity-100">
                                <h2 className="tracking-widest text-sm title-font font-medium text-indigo-500 mb-1">CITY</h2>
                                <h1 className="title-font text-lg font-medium text-gray-900 mb-3">Moscow</h1>
                                <p className="leading-relaxed">Una metrópolis moderna famosa por la icónica Plaza Roja, el Kremlin y la Catedral de San Basilio con sus cúpulas coloridas.</p>
                            </div>
                        </div>
                    </div>
                    <div className="lg:w-1/3 sm:w-1/2 p-4">
                        <div className="flex relative">
                            <img alt="city" className="absolute inset-0 w-full h-full object-cover object-center" src="./src/assets/city/naples_1.jpg"/>
                            <div className="px-8 py-10 relative z-10 w-full border-4 border-gray-200 bg-white opacity-0 hover:opacity-100">
                                <h2 className="tracking-widest text-sm title-font font-medium text-indigo-500 mb-1">CITY</h2>
                                <h1 className="title-font text-lg font-medium text-gray-900 mb-3">Naples</h1>
                                <p className="leading-relaxed"> vibrante y llena de historia, su proximidad al Vesubio y Pompeya, y su rica herencia cultural reflejada en su arte</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section> 
    )
}

export default Inicio