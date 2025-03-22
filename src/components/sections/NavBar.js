import { Link } from 'react-router-dom';

function NavBar() {
    return (
        <section class="container mx-auto px-[50px] md:px-[70px] lg:px-[90px] xl:px-[110px] py-3">
            <div class="flex flex-col gap-1">
                <div class="flex justify-center items-center gap-4">
                    <Link to='/' class="py-1 px-4 border-2 border-white rounded-full hover:border-[#00316E] 
                    text-[#00316E] text-lg font-bold">Home</Link>
                    <Link to='/portfolio' class="py-1 px-4 border-2 border-white rounded-full hover:border-[#00316E] text-sm">Portfolio</Link>
                    <Link to='/contact' class="py-1 px-4 border-2 border-white rounded-full hover:border-[#00316E] text-sm">Contact</Link>
                    <Link to='/more' class="py-1 px-4 border-2 border-white rounded-full hover:border-[#00316E] text-sm">More</Link>
                </div>
                <div class="h-[1px] bg-blue-500"></div>
            </div>
        </section>
    );
}

export default NavBar;