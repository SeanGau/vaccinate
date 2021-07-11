// @flow
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import DataGrid from './VaccineInfo/DataGrid';
import { getAvailability } from '../Types/Hospital';
import { CITY_LIST } from '../Types/Location';

import type { Hospital } from '../Types/Hospital';
import type { VaccineType } from '../Types/VaccineType';

export default function VaccineInfo(
  props: { rows: Array<Hospital>, vaccineType: VaccineType },
): React.Node {
  const { rows, vaccineType } = props;
  const { t } = useTranslation('dataGrid');

  const availableHospitals = rows.filter((row) => getAvailability(row, vaccineType) === 'Available');
  const unavailableHospitals = rows.filter((row) => getAvailability(row, vaccineType) === 'Unavailable');
  const noDataHospitals = rows.filter((row) => getAvailability(row, vaccineType) === 'No data');

  const [selectedLocation, setLocation] = React.useState('新北市');

  function changeLocations(event) {
    setLocation(event.target.value);
  }

  return (
    <div>
      <div style={{ height: '80vh' }} className="d-flex justify-content-center align-items-center text-center">
        <div className="flex-fill">
          <h3 className="mb-4">💉</h3>
          <h1>找疫苗</h1>
          <p>1922 以外的預約方式整理</p>
          <p>Vaccination sites & where to make reservations</p>
          <div className="mt-5">
            <h3>選擇施打點所在縣市</h3>
            <p>請問您想搜尋哪一個縣市的施打點？</p>
            <select name="locations" className="form-select" onChange={changeLocations} value={selectedLocation}>
              {
                Object.keys(CITY_LIST).map((location) => (
                  <option value={location}>{location}</option>
                ))
              }
            </select>
          </div>
        </div>
      </div>
      <div className="mb-4">
        <DataGrid
          selectedLocation={selectedLocation}
          hospitals={availableHospitals}
          buttonText={t('btn-getAppointment')}
          vaccineType={vaccineType}
        />
        <DataGrid
          selectedLocation={selectedLocation}
          hospitals={noDataHospitals}
          buttonText={t('btn-visitWebsite')}
          vaccineType={vaccineType}
        />
        <DataGrid
          selectedLocation={selectedLocation}
          hospitals={unavailableHospitals}
          buttonText={t('btn-visitWebsite')}
          vaccineType={vaccineType}
        />
      </div>
      <div className="text-center my-5 pt-5">
        <h1>😷</h1>
        <p>
          以上就是所有您所要求的疫苗預約資訊，
          <br />
          出去要記得配戴口罩喔！
        </p>
      </div>
    </div>
  );
}
