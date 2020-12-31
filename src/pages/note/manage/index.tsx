import { Badge, Button, Calendar } from "antd";
import React, { createRef, useCallback, useEffect, useState } from "react";
import { Weaper } from "./index.style";
import ContentTitle from "src/components/content-title";
import AddComponent, { AddComponentInstance } from "./_components/add";
import NotesAPI, { AddNotesData, NotesScreenMode } from "src/api/notes";
import moment from "moment";

const NoteManage = () => {
  const instanceRef = createRef<AddComponentInstance>();
  const [list, setList] = useState<Note[]>([]);

  const dateCellRender = (date: moment.Moment) => {
    const result = list.filter(
      d => date.format("YYYY-MM-DD") === moment(d.date).format("YYYY-MM-DD")
    );
    return (
      <ul className="events">
        {result.map(item => (
          <li key={item.id}>
            <Badge status={"success"} text={item.name} />
          </li>
        ))}
      </ul>
    );
  };

  const monthCellRender = (date: moment.Moment) => {
    // console.log(date.format('YYYY-MM-DD'));
    return "";
  };

  const panelChange = useCallback(
    (date: moment.Moment, mode: NotesScreenMode) => {
      let beginDate = "";
      let endDate = "";
      if (mode === "year") {
        const year = date.year();
        beginDate = moment(year + "-01-01").format("YYYY-MM-DD");
        endDate = moment(year + "-12-31").format("YYYY-MM-DD");
      } else {
        const year = date.year();
        const month = date.month() + 1;
        const daysInMonth = date.daysInMonth();
        beginDate = moment(`${year}-${month}-01`).format("YYYY-MM-DD");
        endDate = moment(`${year}-${month}-${daysInMonth}`).format(
          "YYYY-MM-DD"
        );
      }
      NotesAPI.list({ mode, beginDate, endDate }).then(ret => {
        setList(ret.data);
      });
    },
    []
  );

  const add = () => {
    instanceRef.current.show();
  };

  const submit = (value: AddNotesData) => {
    return NotesAPI.add(value)
      .then(() => {
        panelChange(moment(new Date()), "month");
        return Promise.resolve();
      })
      .catch(() => {
        return Promise.reject();
      });
  };

  useEffect(() => {
    panelChange(moment(new Date()), "month");
  }, [panelChange]);

  return (
    <div>
      <ContentTitle title="备案管理">
        <Button type="primary" onClick={() => add()}>
          新增备忘
        </Button>
      </ContentTitle>
      <Weaper className="radius-box">
        <Calendar
          dateCellRender={dateCellRender}
          monthCellRender={monthCellRender}
          onPanelChange={panelChange}
        ></Calendar>
      </Weaper>
      <AddComponent ref={instanceRef} onSubmit={submit}></AddComponent>
    </div>
  );
};

export default NoteManage;

interface Note extends AddNotesData {
  id: string;
  userId: string;
}
