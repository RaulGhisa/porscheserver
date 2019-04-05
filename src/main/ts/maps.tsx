/// <reference path="@types/googlemaps/index.d.ts" />
namespace ro.demo {
    
    module Mapping {

        interface IDeveloper {
            name: string;
            location: string;
            country: string;
            latitude: number;
            longitude: number;
            icontype: string;
        }

        class GoogleMap {
            options: { center: { lat: number; lng: number; }; scrollwheel: boolean; zoom: number; };

            constructor(mapDiv: Element, data: any[], type:string) {
                var devs: Array<IDeveloper> = data;
                var lats = [], longs=[];
                var center: number[];
                devs.map((value)=> {
                    lats.push(value.latitude);
                    longs.push(value.longitude);
                });
                center = this.getLatLngCenter(lats, longs);
            
                this.options = {
                    center: { lat: center[0], lng: center[1] },
                    scrollwheel: false,
                    zoom: 2
                };
            
                this.map = new google.maps.Map(mapDiv, this.options);
            
                switch(type) {
                    case "heat":
                        this.map.setMapTypeId(google.maps.MapTypeId.SATELLITE);
                        this.addHeatMapLayer(data, this.map);
                        break;
            
                    default:
                        this.makeMakers(data, this.map);
                        break;
                }
            }
        }
    }
}