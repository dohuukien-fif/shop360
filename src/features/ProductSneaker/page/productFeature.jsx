import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './styles.scss';
import ProductLisst from './../component/product/productList/index';
import SneakerApi from './../../../api/ProductSneakerApi';
import { Pagination } from '@mui/material';
import ProductFilter from './../component/product/ProductFilter/index';
import Selekent from './../../ProductHome/component/ProductSelekent/seleken';
import { Link } from 'react-router-dom';
ProductFeature.propTypes = {};

function ProductFeature(props) {
  const [Product, setProduct] = useState([]);
  const [Loading, setLoading] = useState(true);
  const [filter, setfilter] = useState({
    _page: 1,
    _limit: 12,
  });
  const [pagination, setpagination] = useState({
    _page: 1,
    _limit: 12,
    _totalRows: 12,
  });
  useEffect(() => {
    const fetchApi = async () => {
      try {
        const res = await SneakerApi.getAll(filter);
        const { data, pagination } = res;
        console.log(data);
        setLoading(false);
        setProduct(data);
        setpagination(pagination);
      } catch (error) {}
    };
    fetchApi();
  }, [filter]);
  const getPagination = (e, page) => {
    setfilter((prev) => ({
      ...prev,
      _page: page,
    }));
  };
  const setFilters = (newfilter) => {
    setfilter((prev) => ({
      ...prev,
      ...newfilter,
    }));
  };
  return (
    <div className="product">
      <div className="product_title">
        <span>
          {' '}
          <Link to="/">Trang chủ</Link> / GIÀY
        </span>
      </div>
      <h2>GIÀY</h2>
      <div className="content">
        <div className="content_left">
          <ProductFilter onChanges={setFilters} filter={filter} />
        </div>
        <div className="content_right">
          {Loading ? <Selekent length={12} /> : <ProductLisst products={Product} />}
          <Pagination
            className="paginations"
            color="primary"
            count={Math.ceil(pagination._totalRows / pagination._limit)}
            page={pagination._page}
            onChange={getPagination}
          ></Pagination>
        </div>
      </div>
    </div>
  );
}

export default ProductFeature;
