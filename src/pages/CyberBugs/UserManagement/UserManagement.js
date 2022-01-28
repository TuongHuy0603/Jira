import React, { useState, useEffect, useRef } from "react";
import {
  Table,
  Tag,
  Space,
  Button,
  Avatar,
  Popconfirm,
  message,
  Popover,
  AutoComplete,
} from "antd";
import ReactHtmlParser from "react-html-parser";
import {
  FormOutlined,
  DeleteOutlined,
  CloseSquareOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import FormEditProject from "../../../components/Forms/FormEditProject.js/FormEditProject";
import { NavLink } from "react-router-dom";

export default function UserManagement(props) {
  //Lấy dữ liệu từ reducer về component
  const userList = useSelector((state) => state.UserManagementReducer.userList);

  // const { userSearch } = useSelector(
  //   (state) => state.UserLoginCyberBugsReducer
  // );

  const [value, setValue] = useState("");

  const searchRef = useRef(null);

  //Sử dụng useDispatch để gọi action
  const dispatch = useDispatch();
  const [state, setState] = useState({
    filteredInfo: null,
    sortedInfo: null,
  });

  useEffect(() => {
    dispatch({ type: "GET_LIST_MANAGEMENT_USER_SAGA" });
  }, []);

  const handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    setState({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };

  const clearFilters = () => {
    setState({ filteredInfo: null });
  };

  const clearAll = () => {
    setState({
      filteredInfo: null,
      sortedInfo: null,
    });
  };

  const setAgeSort = () => {
    setState({
      sortedInfo: {
        order: "descend",
        columnKey: "age",
      },
    });
  };

  let { sortedInfo, filteredInfo } = state;
  sortedInfo = sortedInfo || {};
  filteredInfo = filteredInfo || {};
  const columns = [
    {
      title: "STT",
      dataIndex: "userId",
      key: "userId",
      sorter: (item2, item1) => {
        return item2.userId - item1.userId;
      },
      sortDirections: ["descend"],
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      // render: (text, record, index) => {
      //   return <NavLink to={`/projectdetail/${record.id}`}> {text}</NavLink>;
      // },
      // sorter: (item2, item1) => {
      //   let projectName1 = item1.projectName?.trim().toLowerCase();
      //   let projectName2 = item2.projectName?.trim().toLowerCase();
      //   if (projectName2 < projectName1) {
      //     return -1;
      //   }
      //   return 1;
      // },
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      // render: (text, record, index) => {
      //   return <NavLink to={`/projectdetail/${record.id}`}> {text}</NavLink>;
      // },
      // sorter: (item2, item1) => {
      //   let projectName1 = item1.projectName?.trim().toLowerCase();
      //   let projectName2 = item2.projectName?.trim().toLowerCase();
      //   if (projectName2 < projectName1) {
      //     return -1;
      //   }
      //   return 1;
      // },
    },
    // {
    //     title: 'description',
    //     dataIndex: 'description',
    //     key: 'description',
    //     render: (text, record, index) => {
    //         let contentJSX = ReactHtmlParser(text);

    //         return <div>
    //             {contentJSX}
    //         </div>
    //     }
    // },

    {
      title: "Phone",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      // sorter: (item2, item1) => {
      //   let categoryName1 = item1.categoryName?.trim().toLowerCase();
      //   let categoryName2 = item2.categoryName?.trim().toLowerCase();
      //   if (categoryName2 < categoryName1) {
      //     return -1;
      //   }
      //   return 1;
      // },
    },

    {
      title: "Action",
      dataIndex: "",
      key: "x",
      render: (text, record, index) => {
        return (
          <div>
            <button
              className="btn mr-2 btn-primary"
              onClick={() => {
                const action = {
                  type: "OPEN_FORM_EDIT_PROJECT",
                  title: "Edit Project",
                  Component: <FormEditProject />,
                };

                //dispatch lên reducer nội dung drawer
                dispatch(action);
                //dispatch dữ liệu dòng hiện tai lên reducer
                const actionEditProject = {
                  type: "EDIT_PROJECT",
                  projectEditModel: record,
                };
                dispatch(actionEditProject);
              }}
            >
              <FormOutlined style={{ fontSize: 17 }} />
            </button>
            <Popconfirm
              title="Are you sure to delete this project?"
              onConfirm={() => {
                dispatch({ type: "DELETE_PROJECT_SAGA", idProject: record.id });
              }}
              okText="Yes"
              cancelText="No"
            >
              <button className="btn btn-danger">
                <DeleteOutlined style={{ fontSize: 17 }} />
              </button>
            </Popconfirm>
          </div>
        );
      },
    },
  ];
  return (
    <div className="container-fluid m-5">
      <h3>Project management</h3>
      <Space style={{ marginBottom: 16 }}>
        <Button onClick={setAgeSort}>Sort age</Button>
        <Button onClick={clearFilters}>Clear filters</Button>
        <Button onClick={clearAll}>Clear filters and sorters</Button>
      </Space>
      <Table
        columns={columns}
        rowKey={"id"}
        dataSource={userList}
        onChange={handleChange}
      />
    </div>
  );
}
