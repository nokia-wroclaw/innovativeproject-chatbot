package nokia.wroclaw.innovativeproject.chatbot.repository;

import nokia.wroclaw.innovativeproject.chatbot.domain.Request;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Repository
public interface RequestRepository extends PagingAndSortingRepository<Request, Long> {

    @Override
    Iterable<Request> findAll();

    List<Request> findAllByRequestOwner(String requestOwner);

    List<Request> findAllByRequestOwner(String requestOwner, Pageable pageable);

    List<Request> findAllByRequestOwnerAndIdGreaterThan(String requestOwner, Pageable pageable, Long id);

    List<Request> findAllByResponseRating(String responseRating);

    List<Request> findFirst1ByOrderByDateAsc();

    @Modifying
    @Transactional
    public void deleteByDateBefore(Date dateAgo);

}
