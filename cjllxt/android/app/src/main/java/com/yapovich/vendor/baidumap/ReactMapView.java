package com.yapovich.vendor.baidumap;

import android.util.Log;

import com.baidu.location.BDLocation;
import com.baidu.location.BDLocationListener;
import com.baidu.location.LocationClient;
import com.baidu.location.LocationClientOption;
import com.baidu.mapapi.map.BaiduMap;
import com.baidu.mapapi.map.MapStatus;
import com.baidu.mapapi.map.MapStatusUpdate;
import com.baidu.mapapi.map.MapStatusUpdateFactory;
import com.baidu.mapapi.map.MapView;
import com.baidu.mapapi.map.MyLocationData;
import com.baidu.mapapi.model.LatLng;

/**
 * Created by yebo on 2016/8/1.
 */
public class ReactMapView {
    private MapView mMapView;
    private BaiduMap map;

    private LocationClient mLocationClient = null;
    private BDLocationListener myListener = new BDLocationListener() {
        @Override
        public void onReceiveLocation(BDLocation bdLocation) {
        //Receive Location
            if(bdLocation!=null) {
                MyLocationData locData = new MyLocationData.Builder()
                        .accuracy(bdLocation.getRadius())
                        .latitude(bdLocation.getLatitude())
                        .longitude(bdLocation.getLongitude())
                        .build();
                if (getMap().isMyLocationEnabled()) {
                    getMap().setMyLocationData(locData);
                }
                //�����ͼ״̬
                MapStatus mMapStatus = new MapStatus.Builder()
                        .target(new LatLng(bdLocation.getLatitude(),bdLocation.getLongitude()))
                        .zoom(18)
                        .build();
                //����MapStatusUpdate�����Ա�������ͼ״̬��Ҫ�����ı仯
                MapStatusUpdate mMapStatusUpdate = MapStatusUpdateFactory.newMapStatus(mMapStatus);
                //�ı��ͼ״̬
                getMap().setMapStatus(mMapStatusUpdate);
            }
        /*
        StringBuffer sb = new StringBuffer(256);
        sb.append("time : ");
        sb.append(location.getTime());
        sb.append("\nerror code : ");
        sb.append(location.getLocType());
        sb.append("\nlatitude : ");
        sb.append(location.getLatitude());
        sb.append("\nlontitude : ");
        sb.append(location.getLongitude());
        sb.append("\nradius : ");
        sb.append(location.getRadius());
        if (location.getLocType() == BDLocation.TypeGpsLocation){// GPS��λ���
            sb.append("\nspeed : ");
            sb.append(location.getSpeed());// ��λ������ÿСʱ
            sb.append("\nsatellite : ");
            sb.append(location.getSatelliteNumber());
            sb.append("\nheight : ");
            sb.append(location.getAltitude());// ��λ����
            sb.append("\ndirection : ");
            sb.append(location.getDirection());// ��λ��
            sb.append("\naddr : ");
            sb.append(location.getAddrStr());
            sb.append("\ndescribe : ");
            sb.append("gps��λ�ɹ�");

        } else if (location.getLocType() == BDLocation.TypeNetWorkLocation){// ���綨λ���
            sb.append("\naddr : ");
            sb.append(location.getAddrStr());
            //��Ӫ����Ϣ
            sb.append("\noperationers : ");
            sb.append(location.getOperators());
            sb.append("\ndescribe : ");
            sb.append("���綨λ�ɹ�");
        } else if (location.getLocType() == BDLocation.TypeOffLineLocation) {// ���߶�λ���
            sb.append("\ndescribe : ");
            sb.append("���߶�λ�ɹ������߶�λ���Ҳ����Ч��");
        } else if (location.getLocType() == BDLocation.TypeServerError) {
            sb.append("\ndescribe : ");
            sb.append("��������綨λʧ�ܣ����Է���IMEI�źʹ��嶨λʱ�䵽loc-bugs@baidu.com��������׷��ԭ��");
        } else if (location.getLocType() == BDLocation.TypeNetWorkException) {
            sb.append("\ndescribe : ");
            sb.append("���粻ͬ���¶�λʧ�ܣ����������Ƿ�ͨ��");
        } else if (location.getLocType() == BDLocation.TypeCriteriaException) {
            sb.append("\ndescribe : ");
            sb.append("�޷���ȡ��Ч��λ���ݵ��¶�λʧ�ܣ�һ���������ֻ���ԭ�򣬴��ڷ���ģʽ��һ���������ֽ�����������������ֻ�");
        }
        sb.append("\nlocationdescribe : ");
        sb.append(location.getLocationDescribe());// λ�����廯��Ϣ
        List<Poi> list = location.getPoiList();// POI����
        if (list != null) {
            sb.append("\npoilist size = : ");
            sb.append(list.size());
            for (Poi p : list) {
                sb.append("\npoi= : ");
                sb.append(p.getId() + " " + p.getName() + " " + p.getRank());
            }
        }
        Log.i("BaiduLocationApiDem", sb.toString());
        */
        }
    };
    private void initLocation(){
        mLocationClient = new LocationClient(this.mMapView.getContext());     //����LocationClient��
        mLocationClient.registerLocationListener( myListener );    //ע���������
        LocationClientOption option = new LocationClientOption();
        option.setLocationMode(LocationClientOption.LocationMode.Hight_Accuracy);//��ѡ��Ĭ�ϸ߾��ȣ����ö�λģʽ���߾��ȣ��͹��ģ����豸
        option.setCoorType("bd09ll");//��ѡ��Ĭ��gcj02�����÷��صĶ�λ�������ϵ
        int span=1000;
        option.setScanSpan(span);//��ѡ��Ĭ��0��������λһ�Σ����÷���λ����ļ����Ҫ���ڵ���1000ms������Ч��
        option.setIsNeedAddress(true);//��ѡ�������Ƿ���Ҫ��ַ��Ϣ��Ĭ�ϲ���Ҫ
        option.setOpenGps(true);//��ѡ��Ĭ��false,�����Ƿ�ʹ��gps
        option.setLocationNotify(true);//��ѡ��Ĭ��false�������Ƿ�gps��Чʱ����1S1��Ƶ�����GPS���
        option.setIsNeedLocationDescribe(true);//��ѡ��Ĭ��false�������Ƿ���Ҫλ�����廯�����������BDLocation.getLocationDescribe��õ�����������ڡ��ڱ����찲�Ÿ�����
        option.setIsNeedLocationPoiList(true);//��ѡ��Ĭ��false�������Ƿ���ҪPOI�����������BDLocation.getPoiList��õ�
        option.setIgnoreKillProcess(false);//��ѡ��Ĭ��true����λSDK�ڲ���һ��SERVICE�����ŵ��˶������̣������Ƿ���stop��ʱ��ɱ��������̣�Ĭ�ϲ�ɱ��
        option.SetIgnoreCacheException(false);//��ѡ��Ĭ��false�������Ƿ��ռ�CRASH��Ϣ��Ĭ���ռ�
        option.setEnableSimulateGps(false);//��ѡ��Ĭ��false�������Ƿ���Ҫ����gps��������Ĭ����Ҫ
        mLocationClient.setLocOption(option);
    }
    public ReactMapView(MapView mapView) {
        this.mMapView = mapView;
        this.map=mapView.getMap();
    }
    public BaiduMap getMap(){
        return this.map;
    }
    public void onMapLoaded() {
    }
    public void setShowsUserLocation(boolean showsUserLocation) {
        if (map == null) {
            return;
        }
        getMap().setMyLocationEnabled(showsUserLocation);
        if(showsUserLocation){
            if(mLocationClient==null)
                initLocation();
            if (mLocationClient.isStarted()) {
                mLocationClient.requestLocation();
            } else {
                mLocationClient.start();
            }
        }else{
            if (mLocationClient!=null&&mLocationClient.isStarted()) {
                mLocationClient.stop();
            }
        }
    }
}
