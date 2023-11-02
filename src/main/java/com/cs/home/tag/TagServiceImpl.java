package com.cs.home.tag;

import com.querydsl.core.types.dsl.BooleanExpression;
import javax.persistence.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TagServiceImpl implements TagService {

    private final TagRepository tagRepository;

    private final EntityManager em;

    private final TagMapper mapper;
    @Override
    public Integer saveOrUpdate(TagRequestDto tagPayload) {
        QTag qtag = QTag.tag;
        BooleanExpression equalName = qtag.name.eq(tagPayload.getName());
        BooleanExpression equalId = qtag.id.eq(tagPayload.getId());
        Optional<Tag> tagMaybe = tagRepository.findOne(equalName.or(equalId));
        if (tagMaybe.isPresent()) {
            tagMaybe.get().setName(tagPayload.getName());
//            tagRepository.save(tagMaybe.get());
        } else {

        }
//        QCustomer customer = QCustomer.customer;
//        LocalDate today = new LocalDate();
//        BooleanExpression customerHasBirthday = customer.birthday.eq(today);
//        BooleanExpression isLongTermCustomer = customer.createdAt.lt(today.minusYears(2));

//        Predicate hasBirthday = builder.equal(root.get(Tag_.), today);
//        Predicate isLongTermCustomer = builder.lessThan(root.get(Customer_.createdAt), today.minusYears(2);
//        query.where(builder.and(hasBirthday, isLongTermCustomer));
//        em.createQuery(query.select(root)).getResultList();
        return 1;

//        if (tagPayload.getId()  != null) {
//            tagRepository.findBy()=
//        }
//        tagRepository.find

    }
}
