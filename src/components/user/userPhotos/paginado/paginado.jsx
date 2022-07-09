
import './paginado.css'
import { Button } from 'reactstrap'


export function Pagination({ photosPerPage, allPhotos, paginado }) {

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(allPhotos / photosPerPage); i++) {
        pageNumbers.push(i)
    }

    return <div className="pagination">
        <div>

            <nav >
                {
                    pageNumbers && pageNumbers.map((number) => {
                        return <oli key={number}>
                            <Button className='btnPaginado' onClick={() => paginado(number)}>{number}</Button>
                        </oli>
                    })
                }


            </nav>
        </div>
    </div>
}