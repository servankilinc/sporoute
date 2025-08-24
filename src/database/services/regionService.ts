import {database} from '../index.native';
import {SchmeaModels} from '@/src/constants/SchemaModels';
import {RegionResponseDto} from '@/src/models/Region/RegionResponseDto';
import Region from '../models/Region';

export default {
  GetAll: async function (): Promise<RegionResponseDto[]> {
    const regionCollection = await database.get<Region>(SchmeaModels.regions).query();
    return regionCollection.map(r => {
      return {
        id: r.id,
        name: r.name,
        content: r.content,
      };
    });
  },
};
