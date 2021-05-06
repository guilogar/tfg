import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonItem, IonIcon, IonLabel, IonButton,
  IonButtons, IonInput, IonCheckbox, IonSelect,
  IonSelectOption, IonMenuButton
} from '@ionic/react';
import { arrowBack, arrowBackCircle } from 'ionicons/icons';
import React, { useState, useEffect } from 'react';
import CanvasDraw from "react-canvas-draw";
import { Redirect } from 'react-router';

import { getApi, inputToDataURL } from '../../../services/utils';
import './CreateFarmableLand.css';

const CreateFarmableLand: React.FC = () => {
  const api = getApi();
  const [nameRef, setNameRef] = useState<HTMLIonInputElement | null>(null);
  const [typeRef, setTypeRef] = useState<HTMLIonSelectElement | null>(null);
  const [areaRef, setAreaRef] = useState<HTMLIonInputElement | null>(null);
  const [imageRef, setImageRef] = useState<HTMLInputElement | null>(null);
  const [haveIOTRef, setHaveIOTRef] = useState<HTMLIonCheckboxElement | null>(null);
  const [isSquareRef, setIsSquareRef] = useState<HTMLIonCheckboxElement | null>(null);
  const [haveImage, setHaveImage] = useState<boolean>(true);
  const [isSquare, setIsSquare] = useState<boolean>(true);

  const [types, setTypes] = useState<Array<string>>([]);
  const [canvas, setCanvas] = useState<CanvasDraw | null>();

  const [back, setBack] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const { data } = await api.get('/farmableLandTypes');
      setTypes(data.types);
    })();
  }, []);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      let image = null;
      if (haveImage) {
        image = await inputToDataURL(imageRef);
      } else if(!isSquare) {
        const canvasElements = document.getElementsByTagName('canvas');
        const canvasElement = canvasElements?.item(1);
        image = canvasElement?.toDataURL();
      }

      const farmableLand: any = {
        name: (nameRef?.value) ? nameRef.value : null,
        type: (typeRef?.value) ? typeRef?.value : null,
        image: image,
        haveIOT: haveIOTRef?.checked,
        area: (areaRef?.value) ? Number(areaRef?.value) : null,
        isSquare: isSquareRef?.checked,
      };
      await api.post('/farmableLand', farmableLand);
      setBack(true);
    } catch(err) {
      console.log(err);
    }
  };

  return (
    <IonPage>
      {
        back
        &&
        <Redirect to="/dashboard/page/FarmableLand" exact={true} />
      }
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
            <IonButton onClick={() => { setBack(true) }}>
              <IonIcon slot="icon-only" ios={arrowBackCircle} md={arrowBack} />
            </IonButton>
          </IonButtons>
          <IonTitle>CreateFarmableLand</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <form className="ion-padding" onSubmit={(event) => { handleSubmit(event) }}>
          <IonItem>
            <IonLabel position="floating">Nombre</IonLabel>
            <IonInput
              ref={(nameRef) => { setNameRef(nameRef) }}
              type="text" name="name"
            />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Tipo</IonLabel>
            <IonSelect
              ref={(typeRef) => { setTypeRef(typeRef) }}
              name="type"
            >
              {
                types.map((type, index) => {
                  return (
                    <IonSelectOption value={type} key={index}>
                      {type}
                    </IonSelectOption>
                  );
                })
              }
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Area (m2)</IonLabel>
            <IonInput
              ref={(areaRef) => { setAreaRef(areaRef) }}
              type="number" name="area" step="any"
            />
          </IonItem>
          {
            haveImage
            &&
            <IonItem>
              <IonLabel>Imagen</IonLabel>
              <input
                ref={(imageRef) => { setImageRef(imageRef) }}
                name="image"
                type="file"
                accept="image/*"
                onChange={() => {}}
                onClick={() => {}}
              />
            </IonItem>
          }
          {
            !isSquare
            &&
            <div>
              <IonItem>
                <IonLabel>
                  Al no ser el terreno rectangular, por favor,
                  dibuje la forma que tiene el mismo
                  (es solo para tener por parte de la administracion
                  una idea de como es el terreno)
                </IonLabel>
              </IonItem>
              <IonItem>
                <CanvasDraw
                  ref={(canvas) => { setCanvas(canvas) }}
                  canvasWidth='100%'
                  canvasHeight='400px'
                />
              </IonItem>
            </div>
          }
          <IonItem lines="none">
            <IonLabel>Agregar sistema de IOT</IonLabel>
            <IonCheckbox
              ref={(haveIOTRef) => { setHaveIOTRef(haveIOTRef) }}
              checked={true} slot="start" name="haveIOT"
            />
          </IonItem>
          <IonItem lines="none">
            <IonLabel>Tengo foto aerea o plano del terreno</IonLabel>
            <IonCheckbox
              onClick={() => {
                setHaveImage(!haveImage);
                setIsSquare(true);
              }}
              checked={haveImage} slot="start" name="haveImage"
            />
          </IonItem>
          {
            !haveImage
            &&
            <IonItem lines="none">
              <IonLabel>El terreno tiene forma de cuadrado o rectangulo</IonLabel>
              <IonCheckbox
                ref={(isSquareRef) => { setIsSquareRef(isSquareRef) }}
                onClick={() => { setIsSquare(!isSquare) }}
                checked={isSquare} slot="start" name="isSquare"
              />
            </IonItem>
          }
          <IonButton className="ion-margin-top" type="submit" expand="block">
            Crear
          </IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default CreateFarmableLand;
