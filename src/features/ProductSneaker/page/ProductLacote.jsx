import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import SneakerApi from './../../../api/ProductSneakerApi';
import { Pagination } from '@mui/material';
import { Link } from 'react-router-dom';
import ProductHatLacoste from './../component/product/productList/ProductLacoste/index';
import './stylesQuanJeans.scss';
import ProductFilter from './../component/product/ProductFilter/FilterLacoste/index';
import Seleken from './../../ProductHome/component/ProductSelekent/seleken';

ProductQuanJeans.propTypes = {};

function ProductQuanJeans(props) {
  const [Product, setProduct] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [filters, setfilters] = useState({
    _page: 1,
    _limit: 12,
    categoryName: 'giày Lacoste',
  });
  const [pagination, setpagination] = useState({
    _page: 1,
    _limit: 12,
    _totalRows: 12,
  });
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await SneakerApi.getAll(filters);
        const { data, pagination } = res;

        console.log(data);
        setLoading(false);
        setProduct(data);
        setpagination(pagination);
      } catch (error) {}
    };
    fetchApi();
  }, [filters]);
  const getPagination = (e, page) => {
    setfilters((prev) => ({
      ...prev,
      _page: page,
    }));
  };
  const setFilters = (newfilter) => {
    setfilters((prev) => ({
      ...prev,
      ...newfilter,
    }));
  };
  return (
    <div className="product_trouser">
      <div className="product_trouser_title-trouser">
        <span>
          {' '}
          <Link to="/">Trang chủ</Link> / <Link to="/Giay">Giày</Link> / Giày Lacoste
        </span>
      </div>

      <div className="content_trouser">
        <div className="content_trouser_left-trousersJeans">
          <h2>GIÀY LACOSTE</h2>
          <ProductFilter onChanges={setFilters} filter={filters} />
        </div>
        <div className="content_trouser_right-trouser">
          {/* <ProductQuanJean products={Product} /> */}
          {Loading ? (
            <Seleken length={pagination._limit} />
          ) : (
            <ProductHatLacoste products={Product} />
          )}
          <Pagination
            className="paginations"
            variant="outlined"
            shape="rounded"
            count={Math.ceil(pagination._totalRows / pagination._limit)}
            page={pagination._page}
            onChange={getPagination}
          ></Pagination>
        </div>
      </div>
    </div>
  );
}

export default ProductQuanJeans;
