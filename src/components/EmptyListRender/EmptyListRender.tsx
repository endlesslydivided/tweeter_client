import { BookOutlined, BookTwoTone, CommentOutlined, ContactsOutlined, FrownOutlined, HeartOutlined, HeartTwoTone, MailOutlined, MailTwoTone, MessageOutlined } from '@ant-design/icons';
import React from 'react'


export const emptyMessagesListRender = () => (
  <div style={{ textAlign: 'center' }}>
    <MessageOutlined style={{ fontSize: 20 }} />
    <p>Chat is clear</p>
  </div>
);

export const emptyDialogsListRender = () => (
  <div style={{ textAlign: 'center' }}>
    <MailTwoTone style={{ fontSize: 20 }} />
    <p>No entries</p>
  </div>
);


export const emptyPeopleListRender = () => (
  <div style={{ textAlign: 'center' }}>
    <FrownOutlined style={{ fontSize: 30 }} />
    <p style={{ fontSize: 20 }}>No users are found</p>
  </div>
);

export const emptyLikedListRender = () => (
  <div style={{ textAlign: 'center' }}>
    <HeartTwoTone twoToneColor="#eb2f96" style={{ fontSize: 40 }} />
    <p style={{ fontSize: 30 }}>No liked posts are found</p>
  </div>
);

export const emptySavedListRender = () => (
  <div style={{ textAlign: 'center' }}>
    <BookTwoTone style={{ fontSize: 40 }} />
    <p style={{ fontSize: 30 }}>No saved posts are found</p>
  </div>
);

export const emptyPostListRender = () => (
  <div style={{ textAlign: 'center' }}>
    <ContactsOutlined style={{ fontSize: 20 }} />
    <p>No liked posts are found</p>
  </div>
);

export const emptyReplyListRender = () => (
  <div style={{ textAlign: 'center' }}>
    <CommentOutlined style={{ fontSize: 20 }} />
    <p>No replies</p>
  </div>
);