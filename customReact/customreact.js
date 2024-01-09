function customRender(reactElement,container){
    // const domElement=document.createElement(reactElement.type);
    // domElement.innerHTML = reactElement.children;
    // domElement.setAttribute(href,reactElement.props.href)
    // domElement.setAttribute(target,reactElement.props.target)
    // mainContainer.appendChild(domElement)
    const domElement=document.createElement(reactElement.type);
    domElement.innerHTML = reactElement.children;
    for(const prop in reactElement.props){
        if(prop === 'childern') continue
        domElement.setAttribute(porp,reactElement.props[prop])
    }
    container.appenChild(domElement)
}

const reactElement={
    type:'a',
    props:{
        href: 'https://www.google.com',
        target: '_blank'
    },
    children:'Click me to visit google'
}

const mainContainer = document.querySelector('#root')
customRender(reactElement,mainContainer)  //Rendering the React element into