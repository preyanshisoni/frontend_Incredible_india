import React, { useEffect } from "react";
import { Email, Phone } from "@mui/icons-material";
import styles  from "../Footer/Footer.module.css";
import Link from "next/link";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { fetchLocation } from "@/redux/slice/locationSlice";
import { fetchPlace } from "@/redux/slice/PlaceSlice";
import { fetchCategories } from "@/redux/slice/categorySlice";



const linkVariants = {
  hover: { scale: 1.1, color: "black", transition: { duration: 0.3 } },
  tap: { scale: 0.9 },
};

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 1 } },
};

const Footer = () => {


  const dispatch =  useDispatch();
  const router = useRouter();
  const { locations, loading: locationsLoading } = useSelector(
    (state) => state.locations
  );
  console.log("locations",locations);
  const { categories, loading: categoriesLoading } = useSelector(
    (state) => state.categories
  );
const { places } = useSelector((state) => state.places);

  const handleFooterCategoryClick = (id, categoryName) => {
    sessionStorage.setItem("setCategoryId", id);
    router.push(`/must-visit/${categoryName}`);
  };

  useEffect(()=>{
  dispatch(fetchLocation())
  dispatch(fetchPlace());
  dispatch(fetchCategories())
  },[dispatch])

  return (
    <motion.div className={styles.footer} initial="hidden" animate="visible" variants={fadeIn}>
      <div className={styles.footerContainer}>
        {/* <div className={styles.footer-section footer-logo}> */}
        <div className={styles.footerSection}>
          <h4>Trouble</h4>
        </div>

        {/* Quick Links */}
        <div className={styles.footerSection}>
          <h6>Quick Links</h6>
          <ul>
            <li>
              <Link href="/about" className={styles.noDecoration}>
                <motion.span variants={linkVariants} whileHover="hover" whileTap="tap">
                  › About Us
                </motion.span>
              </Link>
            </li>
            <li>
              <Link href="/contact" className={styles.noDecoration}>
                <motion.span variants={linkVariants} whileHover="hover" whileTap="tap">
                  › Contact Us
                </motion.span>
              </Link>
            </li>
          </ul>
        </div>

        <div className={styles.footerSection}>
          <h6>Categories</h6>
          <ul>
      {categories?.slice(0, 4).map((item, index) => (
        <li key={index}>
          <a
            onClick={() =>
              handleFooterCategoryClick(
                item._id,
                item.name
              )
            }
            className={styles.noDecoration}
            style={{ cursor: "pointer" }}
          >
            <motion.span
              variants={linkVariants}
              whileHover="hover"
              whileTap="tap"
            >
              › {item.name}
            </motion.span>
          </a>
        </li>
      ))}
    </ul>
        </div>

        {/* Destinations */}
        <div className={styles.footerSection}>
          <h6>Destination</h6>
          <ul>
            {places.slice(0,4)?.map(
              (item, index) => (
                <li key={index}>
                  <Link href={`/placeDetails/${item._id}`} className={styles.noDecoration}>
                    <motion.span variants={linkVariants} whileHover="hover" whileTap="tap">
                      › {item.name}
                    </motion.span>
                  </Link>
                </li>
              )
            )}
          </ul>
        </div>


        {/* <div className={styles.footer-section footer-contact}> */}
        <div className={styles.footerSection}>
          <h6>Contact Us</h6>
          <p>205, NRK Biz Park, PU4 <br /> Vijay Nagar, Indore 452010, India</p>
          <p>
            <Email className={styles.footerIcon} />{" "}
            <Link href="mailto:xyz@gmail.com" className={styles.noDecoration}>
              <motion.span variants={linkVariants} whileHover="hover" whileTap="tap">
                xyz@gmail.com
              </motion.span>
            </Link>
          </p>
          <p>
            <Phone className={styles.footerIcon} />{" "}
            <Link href="tel:+918359847330" className={styles.noDecoration}>
              <motion.span variants={linkVariants} whileHover="hover" whileTap="tap">
                +91 8359847330
              </motion.span>
            </Link>
          </p>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <hr className={styles.footerLine}/>
        <div className={styles.footerLinks}>
          <Link href="/" className={styles.noDecoration}>Terms of Use</Link>
          <span className={styles.separator}>|</span>
          <Link href="/privacy-policy" className={styles.noDecoration}>Privacy Policy</Link>
          <span className={styles.separator}>|</span>
          <Link href="/contact" className={styles.noDecoration}>Contact Us</Link>
        </div>

      </div>
    </motion.div>
  );
};

export default Footer;
