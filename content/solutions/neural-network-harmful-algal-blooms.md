---
template: SolutionPage
title: Neural Network Classification of Harmful Algal Blooms
subtitle: Developing a classifier for phytoplankton images for species identification
relslug: neural-network-harmful-algal-blooms
featured:
  image: /assets/hab.jpg
categories:
  - category: Big Data Analytics
meta:
  description: ''
  title: ''
  canonicalLink: ''
  noindex: false
---
Not every [bloom of phytoplankton](https://www.cencoos.org/learn/blooms) is dangerous. Numbers of phytoplankton naturally increase if conditions are good.  However, some phytoplankton species produce toxins, or they occur such high numbers that they clog fish gills or remove all the oxygen from the water when they decompose.  These dangerous conditions are called a [Harmful Algal Bloom](https://www.cencoos.org/learn/blooms/habs/impacts) (HAB). It’s important to alert the public when a HAB is occuring, but it’s equally important not to give false alarms.

To detect a HAB, scientists used to collect water samples and identify the species in it using a microscope.  Now, scientists can take [pictures of organisms](http://oceandatacenter.ucsc.edu/PhytoGallery/IFCB.html) in-situ using an [Imaging FlowCytobot](https://mclanelabs.com/imaging-flowcytobot/) (IFCB). And machine learning techniques have enabled software similar to facial recognition to id the species and count individuals, instead of needing people to view each image. A system like this has been deployed along the [coast of California](https://ucscsciencenotes.com/feature/detecting-deadly-algae/).

Axiom has leveraged its capabilities in big data analytics to improve the accuracy of this system.  We used a custom [convolutional neural network](https://medium.freecodecamp.org/an-intuitive-guide-to-convolutional-neural-networks-260c2de0a050) to classify plankton species detected by IFCB instruments deployed along the coast of California.  The developed classifier identifies plankton species with 96% accuracy compared to 91% accuracy of the older random forest classifier.
