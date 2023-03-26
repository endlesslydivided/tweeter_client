import {
	FileFilled,
  GlobalOutlined,
  PictureOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  Input,
  notification,
  Popover,
  Radio,
  Row,
  Space,
  Tooltip,
  Typography,
  Upload,
  UploadProps,
} from "antd";
import { RcFile } from "antd/es/upload";
import React, { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import {
  useCreateTweetMutation,
  useLazyGetOneTweetQuery,
} from "../../services/TweetApiSlice";
import { appendPost } from "../../store/slices/PostsSlice";
import { fDataFormat } from "../../utils/uploadFormats";
import AudioList from "../MediaFormLists/AudioFormList";
import DocumentsList from "../MediaFormLists/DocumentsFormList";
import MediaList from "../MediaFormLists/MediaFormList";

import "./PostForm.scss";

interface PostFormProps {}

const initialPost = {
  text: "",
  isPublic: true,
  authorId: null,
  isComment: false,
};

const PostForm: React.FC<PostFormProps> = ({}) => {
  const [postValues, setPostValues] = useState(initialPost);
  const [files, setFiles]: any = useState([]);
  const userState: any = useAppSelector((state: any) => state.auth.user);

  const [getPost] = useLazyGetOneTweetQuery();
  const dispatch = useAppDispatch();
  const [createTweet, result] = useCreateTweetMutation();

  const appendToPosts = async (id: any) => {
    const { data, error }: any = await getPost({ id });
    if (data) {
      dispatch(appendPost(data));
    } else if (error) {
      notification.error({ message: error.message, placement: "topRight", duration: 2, });
    }
  };

  const onTextAreaChange = (e: any) => setPostValues((previous) => ({ ...previous, text: e.target.value }));
  const onPublicChange = (e: any) => setPostValues((previous) => ({ ...previous, isPublic: e.target.value }));

  const onCreatePostSubmit = async (e: any) => {
    const formData = new FormData();
    files.forEach((file: any) => {
      formData.append("files", file.file, file.file.name);
    });

    formData.append("text", postValues.text);
    formData.append("isComment", postValues.isComment.toString());
    formData.append("isPublic", postValues.isPublic.toString());
    formData.append("isComment", "false");

    formData.append("authorId", userState?.id);

    const result: any = await createTweet(formData);

    if (result.data) {
      setPostValues((previous: any) => initialPost);
      setFiles([]);
      appendToPosts(result.data.id);
    } else if (result.error) {
      notification.error({
        message: result.error.message,
        placement: "topRight",
        duration: 2,
      });
    }
  };

  const props: UploadProps = {
    name: "file",
    maxCount: 10,
    itemRender: (originNode, file) => {
      return <></>;
    },
    multiple: true,
    beforeUpload: (file, fileList) => {
      if (10 - files.length < fileList.length) {
        notification.error({
          message: "Max files count: 10 files",
          placement: "topRight",
          duration: 2,
        });
        const filesToSet = fileList.splice(10 - files.length);
        setFiles([
          ...files,
          ...filesToSet.map((file: any) => {
            return { file, id: file.uid, type: fDataFormat(file.name) };
          }),
        ]);
      } else {
        setFiles([
          ...files,
          ...fileList.map((file: any) => {
            return { file, id: file.uid, type: fDataFormat(file.name) };
          }),
        ]);
      }

      return false;
    },
  };

  return (
    <Card className="post-form-card">
      <Card.Meta
        className="post-form-card-meta"
        title={
          <Typography.Text className="post-form-card-title" strong>
            Tweet something
          </Typography.Text>
        }
      />

      <Divider type="horizontal" />

      <Space direction="vertical" className={`post-form-card-space ${ files.length === 0 ? "empty-filelist" : "" }`} size="middle" >
        <Row>
          <Col className="post-form-avatar" md={{ flex: 1 }}>
            <Avatar icon={<UserOutlined />} size={36} shape="square" />
          </Col>

          <Col flex="auto">
            <Space direction="vertical" className="post-form-space">
              <Input.TextArea
                autoSize={true}
                value={postValues.text}
                onChange={(e) => onTextAreaChange(e)}
                showCount
                maxLength={1000}
                className="post-form-textarea"
                placeholder="What's happening?"
              />

              <Row className="post-form-textarea-content">
                <Col>
                  <Tooltip title="Add file">
                    <Upload {...props} fileList={files}>
                      <Button type="link" shape="circle" icon={<FileFilled />} />
                    </Upload>
                  </Tooltip>

                  <Popover id="replyPopover" placement="bottomRight" 
									title={
                      <>
                        <Typography.Title className="post-form-popover-title" level={5}
                        >
                          Who can reply?
                        </Typography.Title>
                        <Typography.Text className="post-form-popover-description" type="secondary"
                        >
                          Choose who can reply to this tweet.
                        </Typography.Text>
                      </>
                    }
                    content={
                      <Space direction="vertical" className="post-form-popover-content">
                        <Radio.Group onChange={(e) => onPublicChange(e)} defaultValue={postValues.isPublic} >
                          <Radio.Button className="post-form-button-everyone" value={true} >
                            <Space>
                              <GlobalOutlined /> Everyone
                            </Space>
                          </Radio.Button>
                          <Radio.Button className="post-form-button-follow" value={false} >
                            <Space>
                              <TeamOutlined /> Followers
                            </Space>
                          </Radio.Button>
                        </Radio.Group>
                      </Space>
                    }
                    trigger="click"
                  >
                    {postValues.isPublic ? 
										( 
											<Button type="link" shape="circle" icon={<GlobalOutlined />} >
                        Everyone
                      </Button>
                    ) : 
										(
                      <Button type="link" shape="circle" icon={<TeamOutlined />} >
                        Followers
                      </Button>
                    )}
                  </Popover>
                </Col>

                <Col className="post-form-tweet-col">
                  <Button type="primary" onClick={(e) => onCreatePostSubmit(e)}>
                    Tweet
                  </Button>
                </Col>
              </Row>
            </Space>
          </Col>
        </Row>

        <Row className="post-files-row">
          <MediaList files={files.filter((i: any) => i.type === "video" || i.type === "image")} setFiles={setFiles}/>
          <AudioList files={files.filter((i: any) => i.type === "audio")} setFiles={setFiles} />
          <DocumentsList files={files.filter((i: any) => i.type === "document")} setFiles={setFiles} />
        </Row>
      </Space>
    </Card>
  );
};

export default PostForm;
