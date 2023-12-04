import {useEffect, useState} from "react";

async function fetchVerse(name) {
    const url = `${name}.txt`;
    const response = await fetch(url);
    return response.text();
}

export default function App() {
    const [products, setProducts] = useState([]);
    const [category, setCategory] = useState("All");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('products.json');
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);
    const filter = (event) => {
        event.preventDefault();
    }
    const filteredProducts = products.filter(product => {
        return (category === "All" || product.type === category) &&
            (product.name.toLowerCase().includes(searchTerm.toLowerCase()));
    });
    return (
        <>
            <header>
                <h1>Food category</h1>
            </header>
            <div>
                <aside>
                    <form onSubmit={filter}>
                        <div>
                            <label htmlFor="category">Choose a category:</label>
                            <select id="category" onChange={e => setCategory(e.target.value)}>
                                <option value="All">All</option>
                                <option value="vegetables">Vegetables</option>
                                <option value="food">Food</option>
                                <option value="drink">drink</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="searchTerm">Enter search term:</label>
                            <input type="text" id="searchTerm" placeholder="e.g. beans" onChange={e => setSearchTerm(e.target.value)}/>
                        </div>
                        <div>
                            <button>Filter results</button>
                        </div>
                    </form>
                </aside>
                <main>
                    {filteredProducts.map(product => (
                        <section className={product.type} key={product.name}>
                            <h2>{product.name}</h2>
                            <img src={product.image} alt={product.name}/>
                        </section>
                    ))}
                </main>
            </div>
            <footer>
                <center>
                <p>学籍番号:5422043</p>
                <p>氏名:東里 佑希</p>
                <p>日本大学文理学部情報科学科 Webプログラミングの演習課題</p>
                </center>
            </footer>
        </>
    );
}