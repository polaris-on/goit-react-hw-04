/* eslint-disable react/prop-types */
const List = ({ items }) => {
  //   console.log(items);
  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>
          <img
            src={item.urls.small}
            alt={item.alt_description}
            width={300}
            // height={300}
          />
        </li>
      ))}
    </ul>
  );
};

export default List;
