import React, {Fragment} from 'react';
import {chats} from '../../database';
import moment from 'moment';

const ChatList: React.FC = () => (
  <div className="container">
    <ul className="list">
      {chats.map((item)=>{
        return(<Fragment key={item.id}>
          <img src={item.picture} alt={item.name}/>
          <p>{item.name}</p>
          { item.lastMessage && (<Fragment>
            <p>{item.lastMessage.content}</p>
             <p>{moment(item.lastMessage.createdAt).format('HH:mm')}</p>
          </Fragment>)
          }
         
        </Fragment>);
      })}
    </ul>
  </div>
);

export default ChatList;