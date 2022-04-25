import PropTypes from "prop-types";
import React, { Fragment, useState, useEffect } from "react";
import Swiper from "react-id-swiper";
import { formatter } from "../../helpers/product";
import { Modal } from "react-bootstrap";
import { connect } from "react-redux";

function ProductModal(props) {
  const { product } = props;
  // const { discountedprice } = props;
  // const { finalproductprice } = props;
  // const { finaldiscountedprice } = props;

  const [gallerySwiper, getGallerySwiper] = useState(null);
  const [thumbnailSwiper, getThumbnailSwiper] = useState(null);

  // const [productStock, setProductStock] = useState(
  //   product.variation ? product.variation[0].size[0].stock : product.stock
  // );
  // const [quantityCount, setQuantityCount] = useState(1);

  // const addToCart = props.addtocart;

  // const addToast = props.addtoast;
  // const cartItems = props.cartitems;

  // const productCartQty = getProductCartQty(
  //   cartItems,
  //   product,
  // );

  useEffect(() => {
    if (
      gallerySwiper !== null &&
      gallerySwiper.controller &&
      thumbnailSwiper !== null &&
      thumbnailSwiper.controller
    ) {
      gallerySwiper.controller.control = thumbnailSwiper;
      thumbnailSwiper.controller.control = gallerySwiper;
    }
  }, [gallerySwiper, thumbnailSwiper]);

  const gallerySwiperParams = {
    getSwiper: getGallerySwiper,
    spaceBetween: 10,
    loopedSlides: 4,
    loop: true
  };

  const thumbnailSwiperParams = {
    getSwiper: getThumbnailSwiper,
    spaceBetween: 10,
    slidesPerView: 4,
    loopedSlides: 4,
    touchRatio: 0.2,
    freeMode: true,
    loop: true,
    slideToClickedSlide: true,
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    renderPrevButton: () => (
      <button className="swiper-button-prev ht-swiper-button-nav">
        <i className="pe-7s-angle-left" />
      </button>
    ),
    renderNextButton: () => (
      <button className="swiper-button-next ht-swiper-button-nav">
        <i className="pe-7s-angle-right" />
      </button>
    )
  };

  return (
    <Fragment>
      <Modal
        show={props.show}
        onHide={props.onHide}
        className="product-quickview-modal-wrapper"
      >
        <Modal.Header closeButton></Modal.Header>

        <div className="modal-body">
          <div className="row">
            <div className="col-md-5 col-sm-12 col-xs-12">
              <div className="product-large-image-wrapper">
                <Swiper {...gallerySwiperParams}>
                  {product.image &&
                    product.image.map((single, key) => {
                      return (
                        <div key={key}>
                          <div className="single-image">
                            <img
                              src={process.env.PUBLIC_URL + single}
                              className="img-fluid"
                              alt=""
                            />
                          </div>
                        </div>
                      );
                    })}
                </Swiper>
              </div>
              <div className="product-small-image-wrapper mt-15">
                <Swiper {...thumbnailSwiperParams}>
                  {product.image &&
                    product.image.map((single, key) => {
                      return (
                        <div key={key}>
                          <div className="single-image">
                            <img
                              src={process.env.PUBLIC_URL + single}
                              className="img-fluid"
                              alt=""
                            />
                          </div>
                        </div>
                      );
                    })}
                </Swiper>
              </div>
            </div>
            <div className="col-md-6 col-sm-12 col-xs-12">
              <div className="product-details-content quickview-content">
                <h2>{product.name}</h2>
                <div className="product-details-price">
                  {/* {discountedprice !== null ? ( */}
                    <Fragment>
                      <span>
                      {formatter.format(product.price)}
                      </span>{" "}
                      {/* <span className="old">
                        {finaldiscountedprice + 'VND'}
                      </span> */}
                    </Fragment>
                    {/* )} */}
                  {/* ) : (
                  <span>{formatter.format(product.price)} </span>
                  )} */}
                </div>

                <div className="pro-details-list">
                  <p>{product.description}</p>
                </div>

              </div>
            </div>
          </div>
        </div>
      </Modal>
    </Fragment>
  );
}

ProductModal.propTypes = {
  addtoast: PropTypes.func,
  addtocart: PropTypes.func,
  cartitems: PropTypes.array,
  discountedprice: PropTypes.number,
  finaldiscountedprice: PropTypes.number,
  finalproductprice: PropTypes.number,
  onHide: PropTypes.func,
  product: PropTypes.object,
  show: PropTypes.bool,
};

const mapStateToProps = state => {
  return {
    cartitems: state.cartData
  };
};

export default connect(mapStateToProps)(ProductModal);
