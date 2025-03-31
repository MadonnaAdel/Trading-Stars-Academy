import React from 'react';
import { Col, Container, Row, Card } from 'react-bootstrap';
import styles from './style.module.css';

const FounderAccadmy = () => {
  return (
    <Container>
      <section className={`${styles.descriptionSection} py-5 my-5`}>
        <Row className="align-items-center">
          <Col md={6} className="mb-4">
            <Card className="shadow-lg border-0 p-4">
              <Card.Body>
                <Card.Title className="fw-bold text-primary fs-4">
                  من هو د. مينا سعد؟
                </Card.Title>
                <Card.Text className="text-muted">
                  د. مينا سعد، شاب طموح يبلغ من العمر 25 سنة من محافظة أسيوط، بدأ رحلته في مجال البزنس منذ عام 2018.
                  قبل دخوله عالم البزنس، كان يعمل في مجال الأدوية والصيدليات، حيث اكتسب خبرة كبيرة وهو لا يزال في سن صغيرة.
                </Card.Text>
                <Card.Text className="text-muted">
                  مع مرور الوقت، بدأ في تطوير نفسه ودخل عالم التسويق الإلكتروني والتداول، ليحقق نجاحًا كبيرًا في هذا المجال.
                  كما أنه أصبح أول شخص يظهر على شاشات التلفزيون ويتحدث عن التداول بأسلوب بسيط.
                </Card.Text>
                <Card.Text className="text-muted">
                  في 2024 حصل على الدكتوراه الفخرية في التسويق الإلكتروني، وأسس "Trading Stars Academy" التي انتشرت بسرعة في مصر.
                  وفي 2025، أسس شركة "Smart Line" للنقل الذكي.
                </Card.Text>
                <blockquote className="blockquote text-center text-primary fw-bold mt-3">
                  "حارب من أجل حلمك، مفيش حاجة اسمها مستحيل!"
                </blockquote>
              </Card.Body>
            </Card>
          </Col>

          <Col md={6} className="text-center">
            <div className="" style={{ maxWidth: '400px', margin: '0 auto' }}>
              <img
                src="/mr.mina.jpg"
                alt="MR.Mina"
                width="100%"
                height="auto"
                className="img-fluid rounded-3 shadow"
              />
            </div>
          </Col>
        </Row>
      </section>
    </Container>
  );
};

export default FounderAccadmy;
