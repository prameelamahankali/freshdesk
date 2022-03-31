import React, { useEffect, useState } from 'react';
import AutoSuggestion from './AutoSuggestion';
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    IconButton,
    TableCaption,
    TableContainer,
    Button,
    
} from '@chakra-ui/react';
import { fontSize } from '@mui/system';
import pic from "../DNOWLogo.png";
import './Main.css';

//

function Main(props) {


    const [data, setData] = useState({});
    const [contacts, setContacts] = useState(new Map());
    
    const [conversations, setConversations] = useState(new Map());
    const updateMap = (k,v) => {
        setConversations(new Map(conversations.set(k,v)));
      }
    // const [value, setValue] = useState({});
    // const map2 = new Map();

    useEffect(() => {

        const options = {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'c29Oa0pLUFZteDFoeGNyNVE5UVQ6WA==',
                'soNkJKPVmx1hxcr5Q9QT': 'X'
            })
        };


        // fetch('https://tmsone.freshdesk.com/api/v2/search/tickets?query="status:2%20OR%20status:3%20OR%20status:6%20OR%20status:7"', {
        fetch('https://tmsone.freshdesk.com/api/v2/search/tickets?query="status:2"', {
        // fetch('https://tmsone.freshdesk.com/api/v2/tickets', {

            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'c29Oa0pLUFZteDFoeGNyNVE5UVQ6WA==',
                'soNkJKPVmx1hxcr5Q9QT': 'X'
            })
        })
            .then((response) => {
                // console.log('response ', response.json());
                return response.json();
            })
            .then((data) => {
                console.log('data1', data);
                console.log('total tickets',data.length);
                setData(data.results);
                
                // console.log('data 1 id',data.results.id);
                
                // for(let i=0; i<data.total; i++) {
                //     console.log('fro    ',data.results[i].id);
                //     getConversations(data.results[i].id);
                // }
                for(let i=0; i<data.results.length; i++) {
                    console.log('fro    ',data.results[i].id);
                    getConversations(data.results[i].id);
                }
                
                
            })
            .catch((err) => {
                console.log('err in api call Main ', err);
            })



        fetch('https://tmsone.freshdesk.com/api/v2/contacts', {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'c29Oa0pLUFZteDFoeGNyNVE5UVQ6WA==',
                'soNkJKPVmx1hxcr5Q9QT': 'X'
            })
        })
            .then((response) => {
                return response.json();
            })
            .then((d) => {
                console.log('data2', d);

                console.log('data 2 total ', d.length);
        
                const map1 = new Map();
                for (let i = 0; i < d.length; i++) {
                    //  map1.set(d[i].id, d[i].name);
                    map1.set(d[i].id, d[i].name);
                }

                console.log('map ', map1);
                setContacts(map1)
            })
            .catch((error) => {
                console.log('error', error);
            })




    }, []);

    console.log('data 1 total ', data.total);
    
  
    function getConversations(ticketId) {

        if(ticketId != null) {
            fetch(`https://tmsone.freshdesk.com/api/v2/tickets/${ticketId}/conversations`,{
                method: 'GET',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Authorization': 'c29Oa0pLUFZteDFoeGNyNVE5UVQ6WA==',
                    'soNkJKPVmx1hxcr5Q9QT': 'X'
                })
            })
            .then((response) => {
                return response.json();
            })
            .then((result) => {
                console.log('url length', result.length);
                console.log('url data', result);
                 const map2 = new Map();
                var convArr = [];
                for(let i = 0; i < result.length; i++){

                    if(result[i].body_text.includes('https://tmsone')){
                        
                        let value =  result[i].body_text.split('https://tmsone')
                        let value1 = value[1].split(" ")
                        let url = 'https://tmsone'+value1[0]
                        console.log(url , "urlllll")             //here I am getting only url
                        // map2.set(ticketId, result[i].body_text);
                                                // map2.set(ticketId, url);
                        // conversations.set(ticketId, url);
                       // convArr.push({'ticketId-'+ticketId : url})
                       if(url != null || url != undefined || url != '') {
                        //convArr[ticketId] = url;
                        
                        //map2.set(ticketId, url);
                        //setConversations(new Map(map2));

                        updateMap(ticketId, url);
                       }
                       
                       // console.log('map2 ',convArr);

                      

                                                                    


                    }
                }

                // console.log('map2 ',map2);
                
                 console.log("convArr   " , convArr);  
                 return convArr;         

            })
            .then((conv) => {
                console.log('connn ',conv);
            })
            .catch((error) => {
                console.log('error in getConversations', error);
            })
        }

    }

     console.log('conversations ',conversations);


    function prioritySwitch(el) {
        switch (el) {
            case 1:
                return 'Low';
            case 2:
                return 'Medium';
            case 3:
                return 'High';
            case 4:
                return 'Urgent';
            default:
                break;
        }
    }
    function statusSwitch(el) {
        switch (el) {
            
            case 2:
                return 'Open';
            case 3:
                return 'Pending';
            case 4:
                return 'Resolved';
            case 5:
                return 'Closed';
            case 6:
                return 'Waiting on Customer';
            case 7:
                return 'Waiting on Third Party'
            
            default:
                break;
        }
    }
    // const handleReset = () => {};
    // const handleSearch = () => {};
    return (
        <>
            <div>
                {/* <h1 style={{'fontFamily':'sans-serif','fontSize':'30px', 'fontWeight':'bolder'}}>DNOW</h1> */}
                <div style={{display: 'flex', justifyContent: 'flex-start', margin: '1rem 3rem'}}>
                    <img src={pic} alt="DNOW" width="100" height="250"/>
                </div>

                {/* <form style = {{margin:'auto',padding:'15px',maxWidth:'400px',alignContent:'center'}}
                className='d-flex input-group w-auto'
                onSubmit={handleSearch}
                >
                    <input type='text'
                    className='form-control'
                    placeholder='Search ID...'
                    value={Value}
                    onChange={(e) => setValue(e.target.Value)}
                    />

                    <button type='submit' color='dark'>Search</button>
                    <button className='mx-2' color='info' onClick={() => handleReset()}>Reset</button>
                    

                </form>                 */}
                
                {/* <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Status</th>
                            <th>Priority</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.total > 0 ? data.results.map((el, idx) => {
                            console.log('el ', el.id, idx);

                            return (<tr key={idx}>
                                <td>{el.id}</td>
                                <td>{el.status}</td>
                                <td>{el.priority}</td></tr>)
                        }) : null}
                    </tbody>
                </table> */}
                <div style={{ 'display': 'flex', 'justifyContent': 'center', 'alignItems': 'center'  }}>
                    <div style={{ 'width': '100%' }}>
                    <h1 style={{'textAlign':'right', width: '97%'}}>{data.length > 0 ? <div>Tickets : <b>{data.length}</b></div> : 'No Records Found'}</h1>
                    <div style={{borderRadius: '0.5rem', margin: '1rem', boxShadow: '0 4px 8px 0 rgba(0,0,0,0.3)', width: '97%', padding: '1rem'}}>
                        {/* <TableContainer style={{height: '450px', overflowY: 'scroll', overflowX: 'hidden', scrollbarWidth: 'thin'}}> */}
                        <Table size='sm'>
                            <Thead style={{height: '3rem', width: '100%'}}>
                                <Tr fontWeight='bold'>
                                    <Th style={{width: '5px'}}>Id</Th>
                                    <Th>Status</Th>
                                    <Th>Priority</Th>
                                    <Th>SUBJECT</Th>
                                    <Th>CREATED BY</Th>
                                    <Th>CREATED DATE</Th>
                                    {/* <Th>LAST MODIFIED DATE</Th> */}
                                    <Th>CONVERSATIONS</Th>
                                </Tr>
                            </Thead>
                            <Tbody style={{width: '100%'}}>
                                {data.length > 0 ? data.map((el, idx) => {
                                    console.log('el ', el.id, idx);
                                    // console.log(conversations.size,"ppppppppppp")
                                    // console.log('d2134424  ', contacts.size, el.requester_id, contacts.get(el.responder_id))
                                    return (<Tr style={{height:'3rem'}} key={idx}>
                                        <Td style={{width: '5px'}}>{el.id}</Td>
                                        {/* <Td>{el.status}</Td> */}
                                        <Td>{statusSwitch(el.status)}</Td>
                                        {/* <Td>{el.priority}</Td> */}
                                        {/* <Td style={{ backgroundColor: el.priority == 1 ? 'plum' : el.priority == 2 ? 'yellow' : el.priority == 3 ? 'skyblue' : el.priority == 4 ? 'red' : null }}>{prioritySwitch(el.priority)}</Td> */}
                                        <Td>{prioritySwitch(el.priority)}</Td>
                                        <Td>{el.subject}</Td>
                                        {contacts.get(el.requester_id) != null ? <Td>{contacts.get(el.requester_id)}</Td> : <Td>{'DNOW Contact'}</Td>}
                                        <Td><div style={{display: 'flex', justifyContent: 'center'}}>{new Date(el.created_at).toLocaleDateString()}</div></Td>
                                    
                                        {/* {conversations.get(el.ticketId) != null ? <Td><a href={conversations.get(el.url)} target="_blank">link</a></Td> : <Td>{'No conv'}</Td>} */}
                                        {/* <Td><a href={conversations[el.id]} target="_blank"></a></Td> */}
                                        <Td>{conversations.get(el.id) != null ? <div style={{display: 'flex', justifyContent: 'center'}}><Button size='sm'><a href={conversations.get(el.id)} target="_blank">URL</a></Button></div> : <div style={{display: 'flex', justifyContent: 'center'}}>➖</div>}</Td>

                                        
                                       
                                        {/* <Td>{el.created_at}</Td> */}
                                        {/* <Td>{new Date(el.updated_at).toLocaleString()}</Td> */}
                                        

                                    </Tr>)
                                }) : null}

                            </Tbody>
                        </Table>
                        {/* </TableContainer> */}
                    </div>
                    </div>

                </div>

            </div>

        </>
    )
}


export default Main;