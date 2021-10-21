import {
  Col,
  Layout,
  Row
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
    yField: 'daily_vaccinations'
  }

  useEffect(() => {
    let filters = new Map();
    let query = new QueryHPCCData('hpccsystems_us_vaccine_query');
    query.initData(filters).then(() => {
      setVaccineData(query.getData('us_vaccine'));
    }) 
  }, [])

  return (
    <Layout style={{paddingTop: 10, paddingLeft:30, paddingRight:30}}>
        <Row>
          <Col  span={24} >
            <Chart chart={Column} config={vaccineChart} data={vaccineData} />
          </Col>
        </Row>

        <Row>
          <Col span={24}>
             {/* Data Table */}
          </Col>
        </Row>
    </Layout>
  );
}
