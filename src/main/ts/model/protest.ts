namespace ro.demo {

    export interface Protest {
        protestId: number;
        title: string;
        city: string;
        latitude: number;
        longitude: number;
        dateStart: string;
        timeStart: string;
        dateEnd: string;
        timeEnd: string;
        interested: number;
        participating: number;
        userId: number;
    }
}