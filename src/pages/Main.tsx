import {
  Col,
  Layout,
  Row,
  Table
 } from "antd";

import {QueryHPCCData} from "../utils/QueryHPCCData";
import React, { useEffect, useState } from "react";
import {Column} from "@antv/g2plot";
import { Chart } from "../components/Chart";

export function Main() {

  const [vaccineData, setVaccineData] = useState<any>([]);

  const vaccineChart = {
    padding: 'auto',
    title: {text: 'Population Vaccinated'},
    data: [],
    xField: 'date',
    yField: 'daily_vaccinations',
    yAxis: {
      title: {text: 'Vaccinations'}
    },
    xAxis: {
      title: {text: 'Date'}
    }

  }

  useEffect(() => {
    let filters = new Map();
    let query = new QueryHPCCData('hpccsystems_us_vaccine_query');
    query.initData(filters).then(() => {
      setVaccineData(query.getData('us_vaccine'));
    }) 
  }, [])

  function computeTableColumns(data: any) {
    let columns: any[] = [];
    if (data.length > 0) {
      //Use the first row to construct the columns
      Object.keys(data[0]).forEach((key) => {
        if ("_row_id_" !== key)
          //ignore the decorated column used to produce a unique row key
          columns.push({ title: key, dataIndex: key, key: key });
      });
    }
    return columns;
  }

  return (
    <Layout style={{paddingTop: 10, paddingLeft:30, paddingRight:30}}>
        <Row style={{ paddingBottom: 10, paddingTop: 5}}>
          <Col  span={24} >
            <div className={"label"}>Daily Vaccinations</div>
            <Chart chart={Column} config={vaccineChart} data={vaccineData} />
          </Col>
        </Row>

        <Row style={{ paddingBottom: 10, paddingTop: 5}}>
          <Col span={24}>
             {/* Data Table */}
             <div className={"label"}>Vaccinations Data</div>
             <div style={{overflow: "auto", height: 400}}>
             <Table columns={computeTableColumns(vaccineData)}  rowKey={"date"} dataSource={vaccineData}/>
             </div>
          </Col>
        </Row>
    </Layout>
  );
}
