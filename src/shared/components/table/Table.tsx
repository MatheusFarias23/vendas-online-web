import { Table, type TableProps } from 'antd';

function TableAntd<RecordType extends object = any>(props: TableProps<RecordType>) {
  return <Table {...props} />;
}

export default TableAntd;
