import React, { useCallback, useEffect, useState } from "react";
import { Select } from "antd";
import roleAPI from "src/api/role";
import { SelectValue } from "antd/lib/select";

interface Prop {
  value?: string;
  onChange?: (value: SelectValue) => void;
}

const RoleSelector = React.memo((prop: Prop) => {
  const [list, setList] = useState([]);

  const loadData = useCallback(() => {
    roleAPI.list().then(ret => {
      setList(ret.data);
    });
  }, []);

  const options = list.map(d => (
    <Select.Option value={d.id} key={d.id}>{d.name}</Select.Option>
  ));

  useEffect(() => {
    loadData();
  }, [loadData]);

  return (
    <Select value={prop.value} onChange={val => prop.onChange(val)}>
      {options}
    </Select>
  );
});

export default RoleSelector;
