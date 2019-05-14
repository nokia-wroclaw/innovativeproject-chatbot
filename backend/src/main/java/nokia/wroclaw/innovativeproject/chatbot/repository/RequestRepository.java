package nokia.wroclaw.innovativeproject.chatbot.repository;

import nokia.wroclaw.innovativeproject.chatbot.domain.Request;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RequestRepository extends PagingAndSortingRepository<Request, Long> {

    @Override
    Iterable<Request> findAll();

    List<Request> findAllByRequestOwner(String requestOwner);

    List<Request> findAllByRequestOwner(String requestOwner, Pageable pageable);

    List<Request> findAllByRequestOwnerAndIdGreaterThan(String requestOwner, Pageable pageable, Long id);

    List<Request> findAllByResponseRating(String responseRating);

}
