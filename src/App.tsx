import { memo, FC, useEffect } from "react";
import axios from "axios";
import "./App.css";
import { userType } from "./common/userType";
import { useAppDispatch, useAppSelector } from "./redux/hooks";
import { getAgeText, setAgeText } from "./redux/ageTextSlice";
import { getUserText, setUserText } from "./redux/userTextSlice";
import { setStart, setEnd, getloadStatus } from "./redux/loadStatusSlice";
import { getUsers, setUsers } from "./redux/usersSlice";
import {
  getRadioButtonNumber,
  setRadioButtonNumber,
} from "./redux/radioButtonSlice";

// axios setting
const URL_USER = "/service/api/user";
const client_user = axios.create({
  baseURL: URL_USER,
});

export const App: FC = memo(() => {
  // redux
  const rdxRadioButtonNumber = useAppSelector(getRadioButtonNumber);
  const rdxLoadStatus = useAppSelector(getloadStatus);
  const rdxUserText = useAppSelector(getUserText);
  const rdxAgeText = useAppSelector(getAgeText);
  const rdxUsers = useAppSelector(getUsers);
  const rdxDispatch = useAppDispatch();

  // radio button changed
  const radioButtonChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    rdxDispatch(setRadioButtonNumber(Number(e.target.value)));
  };

  // input field changed
  const userTextChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    rdxDispatch(setUserText(e.target.value));
  };
  const ageTextChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    rdxDispatch(setAgeText(e.target.value));
  };

  // add user
  const addButtonClicked = () => {
    async function _axios() {
      // get from input field
      const user = {
        name: rdxUserText,
        age: Number(rdxAgeText),
      };

      rdxDispatch(setStart());
      await client_user
        .post<userType[]>(``, user)
        .then((_) => {
          rdxDispatch(setEnd());
          getAllUser();
        })
        .catch((_) => {
          rdxDispatch(setEnd());
        });
    }
    _axios();
  };

  // delete user
  const deleteButtonClicked = () => {
    async function _axios() {
      rdxDispatch(setStart());
      await client_user
        .delete<userType[]>(`${rdxRadioButtonNumber}`)
        .then((_) => {
          rdxDispatch(setEnd());
          getAllUser();
        })
        .catch((_) => {
          rdxDispatch(setEnd());
        });
    }
    _axios();
  };

  // get all users
  const getAllUser = () => {
    async function _axios() {
      rdxDispatch(setStart());
      await client_user
        .get<userType[]>(``)
        .then((response) => {
          rdxDispatch(setUsers(response.data));
          rdxDispatch(setEnd());
        })
        .catch((_) => {
          rdxDispatch(setEnd());
        });
    }
    _axios();
  };

  useEffect(() => {
    getAllUser();
  }, []);

  return (
    <>
      <div className="InputsArea">
        <div className="InputArea">
          <label>name:</label>
          <input value={rdxUserText} onChange={userTextChanged} />
        </div>
        <div className="InputArea">
          <label>age:</label>
          <input value={rdxAgeText} onChange={ageTextChanged} />
        </div>
      </div>
      <div className="ButtonArea">
        <button onClick={addButtonClicked}>add</button>
        <button onClick={deleteButtonClicked}>delete</button>
      </div>
      {rdxLoadStatus === true ? (
        <div className="IsLoadingArea">loading...</div>
      ) : (
        <div className="RadioButtonArea">
          {Array.isArray(rdxUsers) &&
            rdxUsers.map((val) => (
              <label className="Label" key={val.id}>
                <input
                  className="Input"
                  type="radio"
                  name="user"
                  value={val.id}
                  checked={rdxRadioButtonNumber === val.id}
                  onChange={radioButtonChanged}
                />
                {val.name + ",  age:" + val.age}
              </label>
            ))}
        </div>
      )}
    </>
  );
});
