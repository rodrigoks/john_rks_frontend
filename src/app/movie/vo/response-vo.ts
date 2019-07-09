import { MovieVO } from './movie-vo';
import { PeopleVO } from './people-vo';
import { SpecieVO } from './specie-vo';

export class ResponseVO {

    movie: MovieVO;
	people: PeopleVO;
	specie: SpecieVO;
    colPeople: PeopleVO[];
    
}