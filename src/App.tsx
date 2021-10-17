import "bootstrap/dist/css/bootstrap.min.css"
import {Button, Container, Row, Col} from "react-bootstrap"
import React, {useState} from "react"
import DockLayout, {LayoutData} from "rc-dock"
import "rc-dock/dist/rc-dock.css"
import Login from "./Login"
import {ApiServerUrlContext} from "./Common";
import {SessionListPanel} from "./SessionListPanel";

let dockLayout: DockLayout;

function getRef(r: DockLayout) {
  dockLayout = r;
}

function SomeRenderer() {
  const [str, setStr] = useState("hell, world!");
  const addTab = () => {
    const newTab = {
      id: str,
      content: <div>hello, my world!</div>,
      title: str
    };

    dockLayout.dockMove(newTab, 'prime', 'middle')
  }
  return <Container>
    <Row className="mx-0">
      <Button as={Col} onClick={() => {
        setStr(str + "dd");
        addTab()
      }}>{str}</Button>
    </Row>
  </Container>
}

const exampleLayout: LayoutData = {
  dockbox: {
    mode: "horizontal",
    children: [
      {
        id: 'prime',
        tabs: [
          {id: "tab1", title: "tabA", content: <SomeRenderer/>},
          {id: "tab2", title: "tab2", content: <div>hellworld 2</div>}
        ]
      }, {
        id: 'subprime',
        minWidth: 240,
        tabs: [
          {id: "tabcc", title: "mvovo", content: <div>wtf?</div>}
        ]
      }
    ]
  }
}

const defaultLayout: LayoutData = {
  dockbox: {
    mode: "horizontal",
    children: [
      {
        id: 'left',
        tabs: [
          {
            cached: true, id: 'sessions',
            title: 'Active Sessions',
            content: <ApiServerUrlContext.Consumer>
              {value => <SessionListPanel url={value}/>}
            </ApiServerUrlContext.Consumer>
          }
        ]
      }
    ]
  }
}

function App() {
  const [url, setUrl] = useState("");
  const [token, setToken] = useState("");

  return url.length === 0 ? (
    <Login setUrl={setUrl} setToken={setToken}/>
  ) : (
    <ApiServerUrlContext.Provider value={url}>
      <DockLayout
        ref={getRef}
        defaultLayout={defaultLayout}
        style={{
          position: "absolute",
          left: 10,
          top: 10,
          right: 10,
          bottom: 10
        }}
      />
    </ApiServerUrlContext.Provider>
  );
}

export default App;
