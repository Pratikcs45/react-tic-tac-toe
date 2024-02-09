import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'





function App() {
    // const [count, setCount] = useState(0)

    // return (


    //   <>
    //     <div id="container"></div>

    //     <div>
    //       <h1>Welcome to my app</h1>
    //       <MyButton />
    //       <AboutPage />
    //       <Profile />
    //       <ShoppingList />
    //     </div>
    //     <div>
    //       <div className="card">
    //         <button onClick={() => setCount((count) => count + 2)}>
    //           count is {count}
    //         </button>

    //       </div>
    //     </div>
    //   </>
    // )

    const [showResults, setShowResults] = useState(false)
    const onClick = () => setShowResults(true)
    return (
        <>
            <div>
                <input type="submit" value="Search" onClick={onClick} />
                {showResults ? <Results setShowResults={setShowResults} /> : null}
            </div>

        </>

    )

}
const user = {
    name: 'Nature',
    imageUrl: 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg',
    imageSize: 1000,
};
const Results = ({ setShowResults }) => (
    <>
        <div id="results" className="search-results">
            <img
                className=""
                src={user.imageUrl}
                alt={'Photo of ' + user.name}
                style={{
                    width: user.imageSize,
                    height: user.imageSize
                }}
            />
            Some Results
        </div>
        <div>
            <button onClick={() => setShowResults(false)}>helo</button>
        </div>
    </>
)



const products = [
    { title: 'Cabbage', id: 1 },
    { title: 'Garlic', id: 2 },
    { title: 'Apple', id: 3 },
];

function MyButton() {
    function handleClick() {
        alert('You clicked me!');
        // <div>hiiii</div>
    }

    return (
        <button onClick={handleClick}>
            Click me
        </button>
    );
}

const listItems = products.map(product =>
    <li key={product.id}>
        {product.title}
    </li>

);

function ShoppingList() {
    const listItems = products.map(product =>
        // console.log(product.id),
        < li
            key={product.id}
            style={{
                color: product.isFruit ? 'magenta' : 'darkgreen'
            }}
        >
            {product.title}
        </li >
    );

    return (
        <ul>{listItems}</ul>
    );
}





function listItemss() {
    return (
        <ul>{listItems}</ul>
    );
}

function Profile() {
    return (
        <>
            <h1>{user.name}</h1>
            <img
                className="avatar"
                src={user.imageUrl}
                alt={'Photo of ' + user.name}
                style={{
                    width: user.imageSize,
                    height: user.imageSize
                }}
            />
        </>
    );
}

// function MyButton() {
//   return (

//     <button>
//       I'm a button
//     </button>
//   );
// }

function AboutPage() {
    return (

        <>
            <h1>About</h1>
            <p>Hello there.<br />How do you do?</p>
            <img className="avatar" />
        </>
    );
}



// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

export default App
